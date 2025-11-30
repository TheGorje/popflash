import type { GrenadeFormData } from "@src/@types/create-trick"
import type { MapsOptions } from "@src/@types/map"
import { useNavigate, useParams } from "react-router-dom"

type PartialState<T> = Partial<T> | undefined;

export type AppRoutes = {
  "404": object;

  "/": object;

  "/create": {
    state?: PartialState<GrenadeFormData>;
  };

  "/map/:mapId": {
    params: { mapId: MapsOptions };
    state?: { scroll?: number };
  };

  "/all-maps": unknown;

  "/settings": unknown;
};


type NavigateParams<T extends keyof AppRoutes> =
  AppRoutes[T] extends { state?: infer S }
    ? { state?: S }
    : object;

export function useTypedNavigation() {
  const navigate = useNavigate()

  return function navigateTyped<T extends keyof AppRoutes>(
    route: T,
    options?: NavigateParams<T>
  ) {
    navigate(route, options as never)
  }
}

export function useTypedParams<T extends keyof AppRoutes>() {
  type Params = AppRoutes[T] extends { params: infer P } ? P : object;
  return useParams() as Params
}
