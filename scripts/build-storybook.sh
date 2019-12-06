build-storybook -c .storybook -o .out  -s ./svg,./font

cd .out
sed -i '' 's/\/svg\//svg\//g' *.js
sed -i '' 's/\/font\//font\//g' *.js
