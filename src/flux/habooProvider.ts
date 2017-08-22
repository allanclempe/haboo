import { config } from "../config";
import HabooSdk from "@haboo/haboo-sdk";
import userSecurity from "./userSecurity";

export default new HabooSdk(config.apiUrl, userSecurity.get);
