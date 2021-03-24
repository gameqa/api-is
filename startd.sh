kill $(lsof -t -i:5000) 
sudo systemctl start mongod
sudo systemctl start redis