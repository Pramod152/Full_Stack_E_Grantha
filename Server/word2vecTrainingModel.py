
import numpy as np
import pickle

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
                self.backward_pass(input_vector, hidden_layer, output, target_idx,input_word_idxs)
        return self.W1        

class RecommendationSystem:
    def __init__(self, courses, cbow_model):
        self.courses = courses
        self.cbow_model = cbow_model
        self.vocab = None

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
     
    def generate_course_embeddings(self):
        self.course_embeddings = {}
        for course_id, course_info in self.courses.items():
            title = course_info['title']
            desc = course_info['desc']
            text = title + " " + desc
            self.course_embeddings[course_id] = self.get_document_embedding(text)
            print("Course ID:", course_id, "Embedding:", self.course_embeddings[course_id])    

    def get_document_embedding(self, text):
        print("Input text:", text)
        print(self.vocab)
        input_word_idxs = [self.vocab[word] for word in text.split() if word in self.vocab]  # Convert words to integer indices
        print("Input word indices:", input_word_idxs)  # Add this line for debugging
        input_vector, _, _ = self.cbow_model.forward_pass(input_word_idxs)
        return input_vector

    def recommend_courses(self, target_course_id, top_n):
        target_embedding = self.course_embeddings[target_course_id]
        target_category = self.courses[target_course_id]['cat']
        similarities = {}
        for course_id, embedding in self.course_embeddings.items():
            similarity = np.dot(target_embedding, embedding) / (np.linalg.norm(target_embedding) * np.linalg.norm(embedding))
            if self.courses[course_id]['cat'] == target_category:
                similarity *= 2  # Increase similarity score for courses in the same category
            similarities[course_id] = similarity
        sorted_similarities = sorted(similarities.items(), key=lambda x: x[1], reverse=True)
        top_recommendations = sorted_similarities[:top_n]
        return top_recommendations

# Define a function to train the CBOW model and generate embeddings
def train_and_generate_embeddings():
    courses = {
        1: {
            'title': 'Exquisite Afternoon Raag Bhimpalasi',
            'desc': 'Bhimpalasi is an afternoon raga, said to evoke sringara [attraction, romantic love].',
            'cat': 'Vocal'
        },
        2: {
            'title': 'Divine Bansuri - Introduction',
            'desc': 'Discover the mesmerizing world of the Bansuri flute in our first tutorial!',
            'cat': 'Instrument'
        },
        3: {
            'title': 'Bansuri Flute Practice',
            'desc': 'In this Bansuri Flute Practice session, we address a common concern: physical discomfort when playing the E-Base Bansuri.',
            'cat': 'Instrument'
        },
        4: {
            'title': 'Raag Bhupali Sargam Geet/Swarmalika',
            'desc': 'This is the tutorial of Raag Bhupali Sargam Geet/Swarmalika for beginner students of Indian Classical Music.',
            'cat': 'Vocal'
        },
        5: {
            'title': 'Raag Yaman Gat in Drut TeenTaal',
            'desc': 'Presenting a gat in Yaman specially to portray the raag from the point of view of the harmonium!',
            'cat': 'Vocal'
        },
        6: {
            'title': 'Kalyani : Raga Yaman on Guitar',
            'desc': 'Immerse yourself in the captivating beauty of Raga Yaman as we explore its essence on the guitar through the melodic framework of Kalyani.',
            'cat': 'Instrument'
        },
        7: {
            'title': 'How to creat taan in indian classical singing',
            'desc': 'How to make sapaat taan in indian vocal classical singing. it is very important materiyal for good riyaaz.',
            'cat': 'Vocal'
        },
        8: {
            'title': 'Shastriya Raga : Sa pa sa',
            'desc': 'Setting our tone by singing Sa Pa Sa with the shruthi box before beginning any song.',
            'cat': 'Vocal'
        },
        9: {
            'title': 'Aakar',
            'desc': 'Discover the beauty of playing the bansuri flute "Aakar" refers to the fundamental forms or shapes in Indian classical music, particularly in Hindustani music.',
            'cat': 'Vocal'
        },
        10: {
            'title': 'Raga Bhopali on Guitar',
            'desc': 'Embark on a musical journey as we bring the serene melodies of Raga Bhopali to life on the guitar.',
            'cat': 'Instrument'
        },
        11: {
            'title': 'HAMSADWANI RAGA ON ACOUSTIC GUITAR IMPROVISATION',
            'desc': 'Indulge in the soul-stirring improvisation of Hamsadhwani Raga on the acoustic guitar.',
            'cat': 'Instrument'
        },
        12: {
            'title': 'VOICE CULTURE Practice',
            'desc': 'Refine your vocal prowess with our Voice Culture Practice session, focusing on the intricate nuances of Indian Classical Music.',
            'cat': 'Song'
        },
        13: {
            'title': 'Indian Classical Violin',
            'desc': 'Discover the captivating artistry of the Indian Classical Violin!',
            'cat': 'Instrument'
        },
        14: {
            'title': 'Learn and Master ALL the 12 NOTES!',
            'desc': 'Unlock the full potential of music by mastering all 12 notes!',
            'cat': 'Vocal'
        },
        15: {
            'title': 'Learn how to play the bansuri: Notes & scales',
            'desc': 'Discover the beauty of playing the bansuri flute by learning notes and scales!',
            'cat': 'Instrument'
        },
        16: {
            'title': 'Palta Training In Indian Music',
            'desc': 'Dive into the traditional practice of Palta, which involves mastering various vocal or instrumental patterns.',
            'cat': 'Song'
        },
        17: {
            'title': 'Whats The Correct Key to Sing',
            'desc': 'Bhimpalasi is an afternoon raga, said to evoke sringara [attraction, romantic love].',
            'cat': 'Song'
        },
        18: {
            'title': 'Free Indian Classical Vocal Lessons',
            'desc': 'Access free Indian Classical Vocal Online Lessons!',
            'cat': 'Vocal'
        }
}

    
    # Initialize CBOW model
    cbow_model = CBOW(vocab_size=10000, embedding_dim=100, window_size=4, learning_rate=0.02)
    
    # Initialize RecommendationSystem
    recommendation_system = RecommendationSystem(courses, cbow_model)
    
    # Train CBOW model
    recommendation_system.train_cbow_model(epochs=5)
    
    recommendation_system.generate_course_embeddings()
    recommendation_system.recommend_courses(1, 5)


    
    # Save trained model and courses to a file
    # Save trained model, courses, and vocab to a file
    with open('cbow_model.pkl', 'wb') as f:
            pickle.dump((recommendation_system), f)
    print("Model training was successful. Model saved to cbow_model.pkl.")    
    

# Call the function to train the model and generate embeddings
if __name__ == "__main__":
    train_and_generate_embeddings()
    

