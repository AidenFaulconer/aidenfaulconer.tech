kubectl config use-context docker-desktop 
kubectl get events --all-namespaces --watch & printf "Events ^\n\n\n\n" &
kubectl get pods --all-namespaces --watch & printf "Pods ^\n\n\n\n" &
kubectl get nodes --watch & printf "Nodes ^\n\n\n\n" &
kubectl get services --all-namespaces --watch & printf "Services ^\n\n\n\n" &
kubectl get deployments --all-namespaces --watch & printf "Deployments ^\n\n\n\n" &
kubectl get replicasets --all-namespaces --watch & printf "Replicasets ^\n\n\n\n" &
kubectl get statefulsets --all-namespaces --watch & printf "Statefulsets ^\n\n\n\n" &
kubectl get daemonsets --all-namespaces --watch & printf "Daemonsets ^\n\n\n\n" &
kubectl get jobs --all-namespaces --watch & printf "Jobs ^\n\n\n\n" &
kubectl get cronjobs --all-namespaces --watch & printf "Cron jobs ^\n\n\n\n" &
kubectl get ingress --all-namespaces --watch & printf "Ingress ^\n\n\n\n" &
kubectl get configmaps --all-namespaces --watch  & printf "Config maps ^\n\n\n\n"