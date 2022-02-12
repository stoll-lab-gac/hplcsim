import React, { useState } from 'react';

/**
 * create a div that can be clicked on to show or hide its children
 * @param {string} legendTitle title of the div
 * @param {boolean} keep whether the children should be kept in
 * the DOM when hidden. Recommended true (the default) for everything
 * except very expensive divs that change constantly even when closed
 * @returns {JSX.Element} rendering
 */
export function Menu({ title, children, keep = true }) {
  const [visible, setVisible] = useState(true);

  /* toggle visibilty state */
  const onClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div onClick={onClick} className="menu_button" style={{textAlign: 'center'}}>{title}</div>
      <div className={visible ? "hidden" : ""}>
        {(!keep && !visible) ? null : children}
      </div>
    </>
  );
}
