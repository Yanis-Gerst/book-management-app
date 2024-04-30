from sqlalchemy import Row, Sequence
from flask import json
from flaskr.utils.commonServices import DbModel

def convert_row_to_dict(row: Row, Model: DbModel):
    dict_row = row._asdict()
    for key in dict_row.keys():
        if type(dict_row[key]) is Model:
            dict_row[key] = json.loads(json.dumps(dict_row[key]))
    return dict_row

def convert_sequence_dict_array(sequence: Sequence[Row], Model: DbModel):
    output = []
    for row in sequence:
        output.append(convert_row_to_dict(row, Model))
    return output


def row_to_merge_dict(result: dict, itemKey: str):
 
    output: dict = result[itemKey]

    outputKeys = output.keys()
    for key in result.keys():
        if (key == itemKey): continue
        if key in outputKeys: raise Exception("not unique key")
        output[key] = result[key]
    
    return output

def convert_sequence_to_sql_dict(sequence: Sequence, itemKey: str, Model: DbModel):
    dict_array = convert_sequence_dict_array(sequence, Model)
    return list(map(lambda item: row_to_merge_dict(item, itemKey), dict_array))
