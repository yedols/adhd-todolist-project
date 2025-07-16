import boto3
import json

def load_firebase_credentials(secret_name="prod/firebase/service-account", region="ap-northeast-2"):
    client = boto3.client("secretsmanager", region_name=region)
    response = client.get_secret_value(SecretId=secret_name)
    secret_string = response['SecretString']
    return json.loads(secret_string)
