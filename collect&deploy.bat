:: Activate environment
call d:/Apps/Anaconda/Scripts/activate mysite

d:
cd \Programming\twitter_clone\twitter-clone-front

:: Build static React site
npm run build

:: Collect static files into Django
cd ..
python manage.py collectstatic

:: Deploy!
D:\Apps\GCP_SDK\google-cloud-sdk\bin\gcloud app deploy

cmd /k