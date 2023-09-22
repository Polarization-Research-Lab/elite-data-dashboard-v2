import pandas as pd
import re
import json

# Read the CSV file into a pandas DataFrame
# csv_file_path = 'test.csv'
csv_file_path = 'd.csv'
df = pd.read_csv(csv_file_path)

# Read the text file and extract relevant data into a dictionary
text_file_path = 'sanitycheck.txt'
data_dict = {}




with open(text_file_path, 'r') as text_file:
    lines = text_file.readlines()

currnt_bioguide_id = None
current_source = None

for line in lines:
    line = line.strip()

    if line.startswith('Bioguide ID:'):
        bioguide_id = re.findall(r"\['(.*?)'\]", line)[0]
        if bioguide_id not in data_dict:
            data_dict[bioguide_id] = {}
            current_bioguide_id = bioguide_id

    elif line.startswith('Source:'):
        source = re.findall(r"\['(.*?)'\]", line)[0]
        if source not in data_dict[bioguide_id]:
            data_dict[current_bioguide_id][source] = {}
            current_source = source

    elif "[" not in line:
        key, value = line.split(': ')
        data_dict[current_bioguide_id][current_source][key] = int(value.strip())


# Compare CSV data with the extracted data and identify mismatches
mismatch_list = []

for index, row in df.iterrows():
    bioguide_id = row['bioguide_id']
    source = row['source']

    if bioguide_id in data_dict and source in data_dict[bioguide_id]:
        csv_values = row[3:].to_dict()
        json_values = data_dict[bioguide_id][source]
        
        # Modify csv_values dictionary keys and remove 'count'
        modified_csv_values = {'_'.join(key.split('_')[1:]): value for key, value in csv_values.items() if key != 'total'}
        for c in modified_csv_values:
            if modified_csv_values[c] != json_values[c]:
                mismatch_list.append([bioguide_id, source, c, modified_csv_values, json_values])

# Print the number of mismatches and the mismatched list
print(f"Number of mismatches: {len(mismatch_list)}")
print("Mismatched list:")

for m in mismatch_list:
    print(m)
