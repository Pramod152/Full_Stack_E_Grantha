import json
import pickle
from training import RecommendationSystem
from training import CBOW
import sys

# Load courses
id = sys.argv[1]
number = json.loads(sys.argv[2])
# Load trained CBOW model
with open('trained_cbow_model.pkl', 'rb') as f:
    cbow_model = pickle.load(f)
    # Get recommendations
    print(cbow_model.recommend_courses(id, number))

