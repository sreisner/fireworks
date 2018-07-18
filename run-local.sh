#!/bin/bash
(cd ./api; start npm run db) &
(cd ./api; start npm run dev) &
(cd ./app; start npm start)