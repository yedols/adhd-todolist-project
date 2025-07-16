import boto3
import json

import boto3
import json

def get_secret(secret_name: str, region_name="ap-northeast-2"):
    client = boto3.client("secretsmanager", region_name=region_name)
    try:
        response = client.get_secret_value(SecretId=secret_name)
        return json.loads(response['SecretString'])
    except Exception as e:
        raise Exception(f"시크릿 가져오기 실패: {e}")
