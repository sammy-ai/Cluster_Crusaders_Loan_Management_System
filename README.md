# The Cluster_Crusaders_Loan_Management_System
Loan management system is a loaning system that utilises cassandra for its ditributive property.

#creating nodes
# Run the first node
docker run --name North_Node -p 9042:9042 -d cassandra:3.7
$INSTANCE1=$(docker inspect --format="{{.NetworkSettings.IPAddress }}" North_Node)
echo "Instance 1: ${INSTANCE1}"

# Run the second node
docker run --name Central_Node -p 9043:9042 -d -e CASSANDRA_SEEDS=$INSTANCE1 cassandra:3.7
$INSTANCE2=$(docker inspect --format="{{.NetworkSettings.IPAddress }}" Central_Node)
echo "Instance 2: ${INSTANCE2}"

# Run the third node
docker run --name South_Node -p 9044:9042 -d -e CASSANDRA_SEEDS=$INSTANCE1,$INSTANCE2 cassandra:3.7
$INSTANCE3=$(docker inspect --format="{{ .NetworkSettings.IPAddress }}" South_Node)

#Now running on citus using the central node as a master and North and South as worker nodes. There's also a manager node.

How the system works
(Make sure the database 'loanmanagement' is running)
First run the node server in the node-postgres folder using 'node index' in the directory then run the react application in the 'react-postgres' folder by running the command 'npm start' in the same directory
