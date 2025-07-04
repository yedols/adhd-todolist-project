import boto3
import os

dynamodb = boto3.resource(
    'dynamodb',
    region_name='ap-northeast-2',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

table = dynamodb.Table("do-todo")