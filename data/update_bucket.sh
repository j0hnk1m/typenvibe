aws s3 sync . s3://typenvibe-songs
aws cloudfront create-invalidation --distribution-id=E1ZY8C4H5GM22O --paths "/*"