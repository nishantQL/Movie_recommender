from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
import os
import gdown # type: ignore

app = FastAPI()

origins = ["http://localhost:3000","https://movie-recommender-three-lemon.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Download model if missing
# -------------------------

SIMILARITY_FILE = "similarity.pkl"
MOVIES_FILE = "movies_df.pkl"

SIMILARITY_URL = "https://drive.google.com/uc?id=130zml4pGwAG7BU-RdeQuZlyDlwCRrNZe"
MOVIES_URL = "https://drive.google.com/uc?id=1t0h5GlkARpagMoV9AdNKN-PxCokXe4Ik"


if not os.path.exists(SIMILARITY_FILE):
    print("Downloading similarity.pkl...")
    gdown.download(SIMILARITY_URL, SIMILARITY_FILE, quiet=False)

if not os.path.exists(MOVIES_FILE):
    print("Downloading movies_df.pkl...")
    gdown.download(MOVIES_URL, MOVIES_FILE, quiet=False)

# -------------------------
# Load models
# -------------------------

movies = pickle.load(open(MOVIES_FILE, "rb"))
similarity = pickle.load(open(SIMILARITY_FILE, "rb"))


@app.get("/")
def health():
    return {"status": "Movie recommender running 🚀"}


def recommend(movie):
    movie = movie.lower()

    index = movies[movies['title'].str.lower() == movie].index

    if len(index) == 0:
        return None

    index = index[0]

    distances = similarity[index]

    movies_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommended = []

    for i in movies_list:
        recommended.append(movies.iloc[i[0]].title)

    return recommended


@app.get("/recommend/{movie_name}")
def get_recommendation(movie_name: str):

    recommendations = recommend(movie_name)

    if recommendations is None:
        return {"error": "Movie not available 😊"}

    return {"recommendations": recommendations}