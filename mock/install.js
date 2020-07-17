
import { mockXHR } from "wl-http"

import explorer from './data/explorer'
import table from './data/table'

const mocks = [
  {
    intercept: true,
    fetchs: explorer
  },
  {
    intercept: true,
    fetchs: table
  }
];

mockXHR(mocks);
