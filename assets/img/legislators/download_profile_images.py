import os
import urllib.request
import json

# Twitter API credentials
# bearer_token = ""
# with open('../../../../../.secrets/api.json', 'r') as file: bearer_token = json.load(file)['twitter']['bearer_token'] # <-- you wont have this file unless you work for the lab; fill in with your own personal bearer_token if you need this script
with open('../../../../../lab/.secrets/api.json', 'r') as file: bearer_token = json.load(file)['twitter']['bearer_token'] # <-- you wont have this file unless you work for the lab; fill in with your own personal bearer_token if you need this script

# List of usernames or user IDs

# Directory to save profile images
save_directory = "profile_images"

# Create the directory if it doesn't exist
os.makedirs(save_directory, exist_ok=True)

# Set headers for API requests
headers = {
    "Authorization": f"Bearer {bearer_token}",
    # "User-Agent": "Polarization Research Lab"
}

# with open('../legislators.json', 'r') as file: legislators = json.load(file)
with open('../../data/legislators.json', 'r') as file: legislators = json.load(file)
users = {l['twitter']: l for l in legislators.values()}

# Function for exponential backoff
def exponential_backoff(retries):
    wait_time = 2 ** retries
    print(f"Rate limited. Retrying in {wait_time} seconds...")
    time.sleep(wait_time)

# Download profile images
for user in users:
    retries = 0
    while retries < 5:  # Maximum number of retries
        try:
            user_info_url = f"https://api.twitter.com/2/users/by/username/{user}?user.fields=profile_image_url"
            request = urllib.request.Request(user_info_url, headers=headers)
            with urllib.request.urlopen(request) as response:
                data = response.read().decode("utf-8")
                user_info = json.loads(data)
                profile_image_url = user_info["data"]["profile_image_url"].replace("_normal", "")

            with urllib.request.urlopen(profile_image_url) as image_response:
                image_data = image_response.read()

            # Save the image
            image_path = os.path.join(save_directory, f"{users[user]}.jpg")
            with open(image_path, "wb") as image_file:
                image_file.write(image_data)

            print(f"Profile image downloaded for {user}")
            break  # Exit the loop if successful

        except urllib.error.HTTPError as e:
            raise(e)
            if e.code == 429:  # Rate limit error
                exponential_backoff(retries)
                retries += 1
            else:
                print(f"Error occurred for {user}: {str(e)}")
                break  # Exit the loop for other errors