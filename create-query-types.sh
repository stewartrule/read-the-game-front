apollo codegen:generate \
  --excludes=node_modules/* \
  --includes=src/graph/**/*.gql \
  --endpoint http://localhost:3000/graphql \
  --target typescript \
  --tagName gql \
  --outputFlat src/graph/types \
  --passthroughCustomScalars

cd src/graph/types
sed -i '' 's/DateTime;/Date;/g' *.ts
