import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useOutsideAlerter from "../../CustomHook/useOutsideAlerter";
import { UserContext } from "../../Context/UserContext";
import "./Assets/Scss/UserInfoAtConner.scss";

export default function UserInfoPopDown() {
  const usercontext = React.useContext(UserContext);
  const wrapperRef = React.useRef(null);
  const customhook = useOutsideAlerter(wrapperRef);
  const navigate = useNavigate();
  const openPopDownHanlde = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    customhook.setShowPopDown(!customhook.showPopDown);
  };

  return (
    <div ref={wrapperRef} className="position-relative">
      <div className="UserInfoAtConner" onClick={(e) => openPopDownHanlde(e)}>
        {usercontext?.userdata?.user?.avatar_url ? (
          <img src={usercontext?.userdata?.user.avatar_url} alt="" />
        ) : (
          <div className="avatarAlternative">
            <h4>{usercontext?.userdata?.user?.name.charAt(0)}</h4>
          </div>
        )}
        <h6>{usercontext?.userdata?.user?.name}</h6>
      </div>
      <div className={customhook.showPopDown ? "popdown" : "d-none"}>
        <div>
          {usercontext?.userdata?.user?.avatar_url ? (
            <img src={usercontext?.userdata?.user?.avatar_url} alt="" />
          ) : (
            <div className="avatarAlternative">
              <h4>{usercontext?.userdata?.user?.name.charAt(0)}</h4>
            </div>
          )}
        </div>
        <p>{usercontext?.userdata?.user?.name}</p>
        <div
          style={{
            backgroundColor: usercontext?.userdata?.user?.role.meta.color,
            color: usercontext?.userdata?.user?.role.meta["text-color"],
          }}
          className="fw-bolder"
        >
          {usercontext?.userdata?.user?.role.name}
        </div>
        <div className="d-flex justify-content-between">
          <Button
            variant="none"
            onClick={() => {
              navigate("/");
            }}
            className="UserInfoPageBtn fw-bolder"
          >
            Hồ sơ
          </Button>
          <Button
            variant="none"
            onClick={() => {
              usercontext?.Logout();
            }}
            className="logoutBtn text-danger fw-bolder"
          >
            Đăng xuát
          </Button>
        </div>
      </div>
    </div>
  );
}
