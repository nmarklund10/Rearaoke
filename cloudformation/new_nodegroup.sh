secgroups=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-SecurityGroups\`].Value" --no-paginate --output text)
subnets=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-SubnetIds\`].Value" --no-paginate --output text)
vpc=$(aws cloudformation list-exports --query "Exports[?Name==\`$1-VpcId\`].Value" --no-paginate --output text)

aws cloudformation deploy --template-file cloudformation/nodegroup.yml \
  --stack-name $1-nodes --parameter-overrides ClusterName=$1 KeyName=udacity_home \
  ClusterControlPlaneSecurityGroup=$secgroups NodeGroupName=$1-nodes1 \
  NodeImageId=ami-04505e74c0741db8d VpcId=$vpc Subnets=$subnets UniqueId='1' --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

