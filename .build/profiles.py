import os, json

with open('../../../../.secrets/db.json', 'r') as file:
    creds = json.load(file)

import ibis
import pandas as pd

# Params
categories = ['blame', 'compromise', 'credit_claiming', 'insult', 'policy', 'foreign_policy', 'legislative_discussion']


# DB
## Connect to new elite database with updated users
# conn = ibis.mysql.connect(
#     host=creds['host'],
#     user=creds['username'],
#     password=creds['password'],
#     # database=creds['database'],
#     database='elite',
# )
# legislators = conn.table('legislators').execute().to_csv('.tmp/legislators.csv')

legislators = pd.read_csv('.tmp/legislators.csv')
legislators = legislators.astype({col: 'int' for col in legislators.select_dtypes(include=['int64']).columns})


## Connect to original database
conn = ibis.mysql.connect(
    host=creds['host'],
    user=creds['username'],
    password=creds['password'],
    database=creds['database'],
)
classif = conn.table('discourse_classification_0')

# Aggregation and Rank Calculation
## recode missing values
# classif_mutated = classif.mutate(**{
#     f'{col}': ibis.ifelse(classif[col] == 9, None, classif[col])
#     for col in categories
# })

## Group by 'bioguide_id' and calculate sum and mean for each column
# result = classif_mutated.group_by('bioguide_id').aggregate(
#     count = classif_mutated['bioguide_id'].count(),
#     **{col + '_count': classif_mutated[f'{col}'].count() for col in categories},
#     **{col + '_sum': classif_mutated[f'{col}'].sum() for col in categories},
#     **{col + '_mean': classif_mutated[f'{col}'].mean() for col in categories},
# )

# result = result.execute().to_csv('.tmp/res-agg.csv')
result = pd.read_csv('.tmp/res-agg.csv')

# result_source = classif_mutated.group_by(['bioguide_id', 'source']).aggregate(
#     count = classif_mutated['bioguide_id'].count(),
#     **{col + '_count': classif_mutated[f'{col}'].count() for col in categories},
#     **{col + '_sum': classif_mutated[f'{col}'].sum() for col in categories},
#     **{col + '_mean': classif_mutated[f'{col}'].mean() for col in categories},
# )
# result_source = result_source.execute().to_csv('.tmp/res-agg-source.csv')
result_source = pd.read_csv('.tmp/res-agg-source.csv')


result = result.merge(legislators[['bioguide_id', 'party']], on = 'bioguide_id', how = 'left')

result[[f"{col}_rank" for col in categories]] = result[[f"{col}_mean" for col in categories]].rank(ascending=False) 
result = result.astype({col: 'int' for col in result.select_dtypes(include=['int64']).columns})

# Iterate through the users and save JSON files
# for idx, (_, politician) in enumerate(result.iloc[0:,:].iterrows()):
for idx, (_, politician) in enumerate(legislators.iterrows()):
    try:
        bioguide_id = politician['bioguide_id']

        politician = result[result['bioguide_id'] == bioguide_id].iloc[0]

        # Get legislator's data
        politician_meta = legislators[legislators['bioguide_id'] == bioguide_id]

        legislator_data = {}
        legislator_data['first_name'] = politician_meta['first_name'].iloc[0]
        legislator_data['last_name'] = politician_meta['last_name'].iloc[0]
        legislator_data['party'] = politician_meta['party'].iloc[0]
        legislator_data['state'] = politician_meta['state'].iloc[0]
        legislator_data['type'] = politician_meta['type'].iloc[0]
        legislator_data['twitter'] = politician_meta['twitter'].iloc[0]
        legislator_data['district'] = int(politician_meta['district'].iloc[0])

        # Initialize scorecard dictionary
        scorecard = {}
        
        # Fill scorecard with category data
        for category in categories:
            scorecard[category] = {}
            scorecard[category]['count'] = int(politician[f'{category}_count'])
            scorecard[category]['percent'] = politician[f'{category}_mean'] # <-- mean is percent because a sum of a binary column / count of a binary column = the mean of a binary column [0,0,0,1,1] == 2/5 == 40%
            scorecard[category]['rank'] = round(politician[f'{category}_rank'], 2)
            scorecard[category]['sources'] = {}
            politician_max_id = classif.filter((classif[category] == 1) & (classif['bioguide_id'] == bioguide_id)).id.max()
            category_example = classif.filter(classif.id == politician_max_id).execute()
            if not category_example.empty:
                scorecard[category]['example'] = {
                    'date': '',
                    'source': category_example['source'].loc[0],
                    'text': category_example['text'].loc[0]
                }
            else:
                scorecard['example'] = None

            # Get source-specific data
            for source in ['floor', 'newsletters', 'statements', 'tweets']:
                source_data = {}
                source_filtered = result_source[(result_source['bioguide_id'] == bioguide_id) & (result_source['source'] == source)]
                if not source_filtered.empty:
                    source_data['count'] = int(source_filtered[f'{category}_count'].iloc[0])
                    source_data['percent'] = source_filtered[f'{category}_mean'].iloc[0]
                else:
                    source_data['count'] = None
                    source_data['percent'] = None

                scorecard[category]['sources'][source] = source_data
                 
        legislator_data['scorecard'] = scorecard
        with open(f'../assets/data/legislators/{bioguide_id}.json','w') as file: 
            file.write(
                json.dumps(legislator_data).replace('NaN','null')
            )
    except:
        print(f'---Failed to get data for {bioguide_id}---')




