#!/bin/sh
##
# author dbxiao
# date 2022-09-08
# copyright dipeak.com
# description https://cr.console.aliyun.com/repository/cn-shanghai/dipeak/diplus-dev/images
# sh build.sh --buildImage web-server main
# sh build.sh --pushImage web-server main
##

name='xstack'
branch='master'
registry='registry.cn-beijing.aliyuncs.com/dbxiao'
version=$branch
user='dbxiao'
current=$(cd $(dirname $0); pwd)


# Print docker conf info
printInfo() {
    dockerInit

    echo -e '\e[33m ##################################### \e[0m'
    echo -e '\e[32m name:\e[0m' $name
    echo -e '\e[32m branch:\e[0m' $branch
    echo -e '\e[32m version:\e[0m' $version
    echo -e '\e[32m images:\e[0m' $registry/$name:$version
    echo -e '\e[32m user:\e[0m' $user
    echo -e '\e[33m ##################################### \e[0m'
}

dockerInit() {
    # echo "xiao5806" | docker login --username=dbxiao@aliyun.com --password-stdin registry.cn-beijing.aliyuncs.com
    echo $registry/$name:$version
}

buildImage() {
    dockerInit
    printInfo
    # installSource
    docker build --pull -t $registry/$name:$version .
    docker images
}

pushImage() {
    dockerInit
    printInfo
    docker $registry/$name:$version
    docker push $registry/$name:$version
}

pullImage() {
    dockerInit
    printInfo
    docker pull $registry/$name:$version
}

runImage() {
    dockerInit
    printInfo
    docker rm -f `docker ps -a -q`
    docker run --name $name -p 0.0.0.0:18000:80 -d $registry/$name:$version
    docker ps -l
    echo '#[INPUT] docker exec -it <containerId> /bin/bash'
}

stopImage() {
    docker rm -f `docker ps -a -q`
    docker ps
}

#installSource() {
    # rm -fr $current/app/webroot/view/*
    # rm -fr $current/app/webroot/res/*
    # mkdir -p $current/app/webroot/view
    # mkdir -p $current/app/webroot/res

    # for dependence in "web-xengine" "web-official" "web-devops" "web-ditest" "ask-meta" "web-mobile" "web-managerx"
    # do
    #     cloneDependence "$dependence"
    # done
#}

# cloneDependence() {
#     local project=$1
#     mkdir -p $current/temp
#     cd $current/temp
#         git clone --single-branch -b $project@main https://oauth2:JY-_P5g3eLpH-iFWXSwa@gitlab.dipeak.com/web/di-deploy
#     cp -frp $current/temp/di-deploy/res/* $current/app/webroot/res/
#     cp -frp $current/temp/di-deploy/view/* $current/app/webroot/view/
#     rm -fr $current/temp
#     cd $current
# }

## $1 = action
## $2 = branch name
parameterFormate() {
    branch=$2
    version=$(echo $branch | sed 's/\//./g')
    echo $branch::$version
}

parameterFormate $1 $2 $3 $4

if [ $1 = '--buildImage' ];then
    buildImage
elif [ $1 = '--pushImage' ];then
    pushImage
elif [ $1 = '--pullImage' ];then
    pullImage
elif [ $1 = '--runImage' ];then
    runImage
elif [ $1 = '--stopImage' ];then
    stopImage
elif [ $1 = '--installSource' ];then
    installSource
else
    printInfo
fi
