import { createPortal } from "react-dom";
import "./StatusBar.scss";

import React, { PropsWithChildren } from "react";
import { SocketConnection } from "./SocketConnection";

export const StatusBar: React.FC<PropsWithChildren> & {
  Left: React.FC<PropsWithChildren>;
  Right: React.FC<PropsWithChildren>;
} = ({ children }) => {
  return (
    <>
      <div className="status-bar">
        <div className="left"></div>
        <div className="right">
          <SocketConnection />
        </div>
      </div>
      {children}
    </>
  );
};

const StatusBarRight: React.FC<PropsWithChildren> = ({ children }) => {
  const right = document.querySelector(".status-bar .right");

  return (
    <>
      {right && children
        ? (createPortal(children, right) as React.ReactElement)
        : null}
    </>
  );
};

const StatusBarLeft: React.FC<PropsWithChildren> = ({ children }) => {
  const left = document.querySelector(".status-bar .left");

  return (
    <>
      {left && children
        ? (createPortal(children, left) as React.ReactElement)
        : null}
    </>
  );
};

StatusBar.Left = StatusBarLeft;
StatusBar.Right = StatusBarRight;
