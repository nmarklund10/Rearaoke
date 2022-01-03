instancearn=$(aws cloudformation list-exports --query "Exports[?Name==\`NodeInstanceRole$1\`].Value" --no-paginate --output text)

sed -i "s|<INSTANCE_ARN>|$instancearn|" cloudformation/test.yml

kubectl apply -f cloudformation/test.yml