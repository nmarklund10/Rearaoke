aws cloudformation deploy --template-file cloudformation/network.yml --stack-name $1 --parameter-overrides EnvironmentName=$1

secgroups=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-SecurityGroups\`].Value" --no-paginate --output text)
subnets=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-SubnetIds\`].Value" --no-paginate --output text)
vpc=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-VpcId\`].Value" --no-paginate --output text)

aws eks --region us-east-1 create-cluster --name $1  --resources-vpc-config subnetIds=$subnets,securityGroupIds=$secgroups \
  --role-arn arn:aws:iam::337443224052:role/eksRole

aws eks --region us-east-1 update-kubeconfig --name $1
