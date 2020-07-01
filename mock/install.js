
import { mockXHR } from "wl-http"

import explorer from './data/explorer'

const mocks = [
  {
    intercept: true,
    fetchs: explorer
  }
];

mockXHR(mocks);
