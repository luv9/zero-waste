pipeline {
    agent any 
    stages {
        stage('Build') 
        {
            steps {
                script{
                    sh"""
                    pwd
                    ll
                    docker build . -t krishnap1999/zerowaste-backend:${BUILD_NUMBER}
                    docker image ls
                    """
            }
        }   
        stage('push') 
        {
            steps {
                script{
                    sh"""
                    docker image push krishnap1999/zerowaste-backend:${BUILD_NUMBER}
                    """
            }
        } 
    }     
}
