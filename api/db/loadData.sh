#!/bin/bash

mongoimport --db fireworks --collection categories --file ./data/categories.json --jsonArray;
mongoimport --db fireworks --collection products --file ./data/products.json --jsonArray;
mongoimport --db fireworks --collection bundles --file ./data/bundles.json --jsonArray;