import numpy as np
import pickle
import requests
import json

class CBOW:
    def __init__(self, vocab_size, embedding_dim, window_size, learning_rate):
        self.vocab_size = vocab_size
        self.embedding_dim = embedding_dim
        self.window_size = window_size
        self.learning_rate = learning_rate
        self.W1 = np.random.randn(vocab_size, embedding_dim)
        self.W2 = np.random.randn(embedding_dim, vocab_size)

    def get_context(self, text, idx):
        context = []
        start = max(0, idx - self.window_size)
        end = min(len(text), idx + self.window_size + 1)
        for i in range(start, end):
            if i != idx:
                context.append(text[i])
        return context

    def forward_pass(self, input_word_idxs):
        if not input_word_idxs:
            print("Input word indices is empty.")
            return None, None, None
        input_vector = np.mean([self.W1[idx] for idx in input_word_idxs], axis=0)
        hidden_layer = np.dot(input_vector, self.W2)
        output = self.softmax(hidden_layer)
        return input_vector, hidden_layer, output

    def backward_pass(self, input_vector, hidden_layer, output, target_idx, input_word_idxs):
        output_grad = output.copy()
        output_grad[target_idx] -= 1
        hidden_grad = np.dot(output_grad, self.W2.T)
        self.W2 -= self.learning_rate * np.outer(input_vector, output_grad)
        print(input_word_idxs)
        for idx in input_word_idxs:
            self.W1[idx] -= self.learning_rate * hidden_grad

    def softmax(self, x):
        exp_scores = np.exp(x - np.max(x))
        return exp_scores / np.sum(exp_scores)

    def train(self, corpus, epochs):
        for _ in range(epochs):
            for i, word in enumerate(corpus):
                input_word_idxs = self.get_context(corpus, i)
                input_vector, hidden_layer, output = self.forward_pass(input_word_idxs)
                print('Hidden layer:', hidden_layer)
                target_idx = corpus[i]
                self.backward_pass(input_vector, hidden_layer, output, target_idx, input_word_idxs)
        return self.W1        

class RecommendationSystem:
    def __init__(self, courses, cbow_model):
        self.cbow_model = cbow_model
        self.courses = courses
        print('Courses:', self.courses)
        self.vocab = None
        self.course_embeddings = None

    def preprocess_text(self, text):
        return text.lower().split()

    def train_cbow_model(self, epochs):
        # Create a list of all words in the corpus
        vocab_words = list(set([word for course in self.courses.values() if isinstance(course['title'], str) and isinstance(course['desc'], str) for word in (course['title'] + ' ' + course['desc']).split()]))
        print("Vocabulary words:", vocab_words)
        self.vocab = {word: idx for idx, word in enumerate(vocab_words)}  # Map words to integer indices
        corpus_idxs = [[self.vocab[word] for word in (course['title'] + ' ' + course['desc']).split() if word in self.vocab] for course in self.courses.values() if isinstance(course['title'], str) and isinstance(course['desc'], str)]
        flattened_corpus = [idx for course_idxs in corpus_idxs for idx in course_idxs]
        self.cbow_model.train(flattened_corpus, epochs)
        return self.cbow_model
       
        # Generate course embeddings
    def generate_course_embeddings(self):    
        self.course_embeddings = {}
        for course_id, course_info in self.courses.items():
            title = course_info['title']
            desc = course_info['desc']
            text = title + " " + desc
            self.course_embeddings[course_id] = self.get_document_embedding(text)
            print("Course ID:", course_id, "Embedding:", self.course_embeddings[course_id])    

    def get_document_embedding(self, text):
        print('Text:', text)
        input_word_idxs = [self.vocab[word] for word in text.split() if word in self.vocab]  
        input_vector, _, _ = self.cbow_model.forward_pass(input_word_idxs)
        return input_vector


    def recommend_courses(self, target_course_id, top_n):
        target_embedding = self.course_embeddings[target_course_id]
        target_category = self.courses[target_course_id]['cat']
        similarities = {}
        for course_id, embedding in self.course_embeddings.items():
            similarity = np.dot(target_embedding, embedding) / (np.linalg.norm(target_embedding) * np.linalg.norm(embedding))
            if self.courses[course_id]['cat'] == target_category:
                similarity *= 2  
            similarities[course_id] = similarity
        sorted_similarities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)
        top_recommendations = sorted_similarities[:top_n]
        
        # # Return course information in JSON format
        # top_recommendations_info = [{"_id":course_id, **self.courses[course_id]} for course_id, _ in top_recommendations]
        # recommendation_Data = json.dumps({"status": "ok", "message": top_recommendations_info})
        # # print('Top recommendations:', top_recommendations_info)
        # return recommendation_Data
        return json.dumps({"status": "ok", "message": [{"_id": course_id, **self.courses[course_id]} for course_id, _ in top_recommendations]})
        

# Define a function to train the model and generate embeddings
def train_and_generate_embeddings():
    # Define a function to fetch courses from Node.js API
    def fetch_courses_from_api():
        url = 'http://localhost:3000/E-Grantha/user/allVideos'  # Assuming your Node.js server is running locally on port 3000
        response = requests.get(url)
        if response.status_code == 200:
            print("Courses fetched successfully.")
            return response.json()
        else:
            print(f"Failed to fetch courses. Status code: {response.status_code}")
            return None
    data = fetch_courses_from_api()

    courses = {}

    for entry in data['message']:
        course_id = entry['_id']
        courses[course_id] = {
            'title': entry['title'],
            'desc': entry['description'],
            'cat': entry['videoCategory'],
            'videoId': entry['videoId'],
            'videoLink': entry['videoLink'],
            'thumbnailPath': entry['thumbnailPath'],
            'thumbnailUrl': entry['thumbnailUrl']
        }

    print('Courses', courses)
    
    # Initialize CBOW model
    cbow_model = CBOW(vocab_size=10000, embedding_dim=100, window_size=4, learning_rate=0.02)
    
    # Initialize RecommendationSystem
    recommendation_system = RecommendationSystem(courses, cbow_model)
    
    # Train CBOW model and generate embeddings
    recommendation_system.train_cbow_model(epochs=15)
    recommendation_system.generate_course_embeddings()
    print('Course embeddings', recommendation_system.course_embeddings.keys())
    recommendation_system.recommend_courses('65fc6e8869baccc00322ca27',4)
    # Save trained model and courses to a file
    with open('trained_cbow_model.pkl', 'wb') as f:
        pickle.dump((recommendation_system), f)
    print("Model training was successful. Model saved to cbow_model.pkl.")    

# Call the function to train the model and generate embeddings
if __name__ == "__main__":
    train_and_generate_embeddings()
