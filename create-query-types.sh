apollo codegen:generate \
  --excludes=node_modules/* \
  --includes=src/queries/**/*.gql \
  --endpoint http://localhost:3000/graphql \
  --target typescript \
  --tagName gql \
  --outputFlat src/queries/types \
  --passthroughCustomScalars

cd src/queries/types
sed -i '' 's/DateTime;/Date;/g' *.ts
