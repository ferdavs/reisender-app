/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { svelteNative } from "svelte-native";
import App from "./components/App.svelte";
import { init } from "nativescript-facebook-7";
import { Application } from "@nativescript/core";
Application.on(Application.launchEvent, () => {
    init("2919521278376314");
});

svelteNative(App, {});
