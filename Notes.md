#Process

##Create New Post

##View Locally

    rake preview



#EC2

Spun up instance with security group filmalytics-ubuntu and using filmalytics keypair.

ssh -i filmalytics.pem ubuntu@ec2-54-224-140-20.compute-1.amazonaws.com

https://www.digitalocean.com/community/articles/how-to-install-rails-and-nginx-with-passenger-on-ubuntu
sudo apt-get update
curl -L get.rvm.io | bash -s stable
source ~/.profile

source ~/.rvm/scripts/rvm
rvm requirements
rvm install 1.9.3
rvm use 1.9.3 -- default

https://www.digitalocean.com/community/articles/how-to-install-nginx-on-ubuntu-12-04-lts-precise-pangolin
sudo apt-get install nginx
sudo service nginx start

sudo cp nginx.conf old.nginx.conf
Didn't make any changes to nginx.conf however

cd conf.d
sudo vim filmalytics.com.conf
pasted from here:
http://kmil.us/blog/2012/11/25/build-a-webserver-capable-of-10000000-hits-per-day/
and made changes

sudo service nginx restart

