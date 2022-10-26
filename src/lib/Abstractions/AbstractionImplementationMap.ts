import { ILifecycleEventEmitter } from "../Profiles/Core/Abstractions/ILifecycleEventEmitter";
import { ILogger } from "../Profiles/Core/Abstractions/ILogger";
import { IScene } from "../Profiles/Scene/Abstractions/IScene";

export type AbstractionImplementationMap = {
  'ILogger'?: ILogger,
  'IScene'?: IScene,
  'ILifecycleEventEmitter'?: ILifecycleEventEmitter
}
