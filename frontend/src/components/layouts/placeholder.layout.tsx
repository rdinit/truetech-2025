import { observer } from "mobx-react-lite";
import { FC, PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title: string;
  description: ReactNode;
}

export const PlaceholderLayout: FC<Props> = observer((x) => {
  return (
    <>
      <div className="relative z-10 bg-background w-fit rounded-2xl mt-14">
        <h1 className="mb-3 font-extrabold text-5xl">{x.title}</h1>
        <p className="text-2xl">{x.description}</p>
        {x.children}
      </div>
    </>
  );
});
