# this script installs tilt and sets up development context for docker

# ensure kubernetes is enabled in docker desktop before running this 
kubectl config use-context docker-desktop &&

# switch to powershell
# powershell &&
# iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/tilt-dev/tilt/master/scripts/install.ps1'))
# tilt version
# exit


# install && build for react deployments
cd ./frontend && npm i && npm run build && cd ../../ 

# start kubernetes cluster
./start-frontend.bash &&

# start react-app
./start-frontend.bash