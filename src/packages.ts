export { injectable, inject } from "inversify";
import inquirer from "inquirer";
import colors from "colors";
import axios from "axios";
import si from "systeminformation";
import { table } from "table";

import { Container, ContainerModule } from "inversify";

export const inversify = { Container, ContainerModule };
export { inquirer };
export { colors };
export { axios };
export { si };
export { table };
