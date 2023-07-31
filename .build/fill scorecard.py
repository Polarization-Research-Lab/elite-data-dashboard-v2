import os, json, urllib.request

import numpy as np 
import pandas as pd 

# import distilldb as ddb
# Load database wrapper
# db = ddb.Database(
#     config = '../../../../.secrets/db.json',
# )

with open('../assets/data/legislators.json', 'r') as file: legislators = json.load(file)

# with db.Session() as session:
sources = ['floor', 'newsletters', 'tweets', 'statements']
categories = ['blame','compromise','credit claiming','insult','policy','foreign policy','legislative discussion','advertising']


for l in legislators: # l is bioguide_id
    print(l)
    for source in sources:
        print('\t', source)

        # res = pd.read_sql(
        #     db[source].select().where(db[source].c.bioguide_id == l),
        #     db.engine,
        # )

        # classifications = pd.read_sql(
        #     db['classification'].select().where(db['classification'].c.source == source, db['classification'].c.source_id.in_(res['id'])),
        #     db.engine,
        # )

        # do some calculations to get total numer in each discourse category
        # ...

        # temporary fillin: 
        legislators[l]['scorecard'] = {
            category: {
                'count': np.random.randint(0,10000),
                'percent': np.random.uniform(0,1),
                'rank': np.random.randint(500),
                'sources': {source: {'count': np.random.randint(0,1000), 'percent': np.random.uniform(0,1)} for source in sources},
                'last_example': "last message...",
                'last_example_date_source': 'Apr 9th, 2023 on Twitter',
            }
            for category in categories
        }
        legislators[l]['voting record']['ideology score'] = np.random.randint(0, 100)
        # print(json.dumps(legislators[l]['scorecard'], indent = 4))
        # exit() 


# reloop through legislators for rank
# get rank meta
# calculation loop
# ...

with open('../assets/data/legislators.json', 'w') as file: json.dump(legislators, file, indent = 4)