if test -z "$1" 
then
  echo "Please provide a file name as the argument"
  exit 1;
else
  echo "$(wc -l < $1) total quotes since launch"
  echo "$(cat $1 | grep 'status = success' | wc -l) successful quotes"
  echo "$(cat $1 | grep 'status = failure' | wc -l) failed quotes"
  echo "\$$(cat $1 | grep 'status = success' | awk '{sum+=$14}END{printf '\"'%'\''.2f'\"',sum/NR}') average premium"
  exit 0;
fi