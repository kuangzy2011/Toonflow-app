curl -v -X POST http://127.0.0.1:10588/api/login/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

curl -v -X POST http://127.0.0.1:10588/api/setting/vendorConfig/getVendorList \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzg3ODg3ODAxLCJleHAiOjE4MDM0Mzk4MDF9.kYof_YEnuNocy8OGUEivVv0-S3lmpXGZnBE2lIVbXII"
  
curl -v -X POST http://127.0.0.1:10588/api/modelSelect/getModelList \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzg3ODg3ODAxLCJleHAiOjE4MDM0Mzk4MDF9.kYof_YEnuNocy8OGUEivVv0-S3lmpXGZnBE2lIVbXII" \
  -d '{"type":"text"}'
