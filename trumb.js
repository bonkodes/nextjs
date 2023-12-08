"use client";
import React, { useRef, useEffect, useState } from "react";
import "./FilterTrumb.css";

export default function FilterTrumb() {
  let [coordinate, setcoordinate] = useState();
  let ref_move = useRef();
  let ref_resize = useRef();
  let ref_resize2 = useRef();
  let control1 = useRef();
  let control2 = useRef();
  let global = 0;
  let l_block = 0;
  let r_block = 0;
  let diapazon_start = 150;
  let diapazon_end = 200;
  const input_ref = useRef(null);
  const input_ref2 = useRef(null);
  let [widthcustom, setwidthcustom] = useState(10);
  let [widthcustom2, setwidthcustom2] = useState(10);
  useEffect(() => {
    // global = parseInt(Math.floor(ref_move.current.offsetWidth, 10));
    return () => {
      ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize);
    };
  }, []);
  let onMouseMoveRightResize = (e) => {
    let global = parseInt(Math.floor(ref_move.current.offsetWidth, 5));
    let global_r_block = parseInt(
      Math.floor(ref_resize2.current.offsetWidth, 10)
    );
    let global_l_block = parseInt(
      Math.floor(ref_resize.current.offsetWidth, 10)
    );
    input_ref.current.value = parseInt(
      Math.floor(
        diapazon_start +
          ((diapazon_end - diapazon_start) / 200) *
            Math.floor(parseInt(global_l_block))
      )
    );
    console.log(e.clientX, "parseInt(e.clientX)", ref_move);
    if (
      global_l_block <= global - global_r_block - 3 &&
      e.clientX - ref_move.current.offsetLeft >= 0
    ) {
      ref_resize.current.style.minWidth = `${
        e.clientX - ref_move.current.offsetLeft + 5
      }px`;
      control1.current.style.left = `${
        e.clientX - ref_move.current.offsetLeft - 5
      }px`;
      // setwidthcustom(parseInt(global_l_block));
    }
    if (global_l_block > global - global_r_block - 3) {
      // setwidthcustom(10);
      ref_resize.current.style.minWidth = `${global - r_block - 3}px`;
      control1.current.style.left = `${global - r_block - 13}px`;
      ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize);
    }
  };
  let onMouseMoveRightResize2 = (e) => {
    let global = parseInt(Math.floor(ref_move.current.offsetWidth, 10));
    let global_l_block = parseInt(
      Math.floor(ref_resize.current.offsetWidth, 10)
    );
    let global_r_block = parseInt(
      Math.floor(ref_resize2.current.offsetWidth, 10)
    );
    input_ref2.current.value = parseInt(
      Math.floor(
        diapazon_end -
          ((diapazon_end - diapazon_start) / 200) *
            Math.floor(parseInt(global_r_block))
      )
    );
    console.log(e.clientX, "parseInt(e.clientX)", ref_move.current.offsetLeft);
    if (
      global - (e.clientX - ref_move.current.offsetLeft) <=
        global - global_l_block - 8 &&
      global - (e.clientX - ref_move.current.offsetLeft) >= 0
    ) {
      ref_resize2.current.style.minWidth = `${
        global - (e.clientX - ref_move.current.offsetLeft) + 5
      }px`;
      control2.current.style.right = `${
        global - (e.clientX - ref_move.current.offsetLeft) - 5
      }px`;
      r_block = global - e.clientX - ref_move.current.offsetLeft + 5;
    }
  };
  let MouseDownHandler = (e) => {
    e.preventDefault();
    ref_move.current.addEventListener("mousemove", onMouseMoveRightResize);
    console.log("MouseDown", ref_move.current.clientX);
  };
  let MouseUpHandler = (e) => {
    console.log("MouseUpHandler");

    ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize);
    ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize2);
    control1.current.removeEventListener("mousedown", MouseDownHandler);
    control2.current.removeEventListener("mousedown", MouseDownHandler2);
  };
  let MouseDownHandler2 = (e) => {
    e.preventDefault();
    ref_move.current.addEventListener("mousemove", onMouseMoveRightResize2);
  };
  let MouseUpHandler2 = (e) => {
    ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize2);
  };

  let res2 = (e) => {
    ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize);
    ref_move.current.removeEventListener("mousemove", onMouseMoveRightResize2);
    control1.current.removeEventListener("mousedown", MouseDownHandler);
    control2.current.removeEventListener("mousedown", MouseDownHandler2);
    console.log("res2");
  };
  let input_vvod = (e) => {
    if (
      parseInt(e.target.value) >= diapazon_start &&
      parseInt(e.target.value) <= diapazon_end
    ) {
      let global = parseInt(Math.floor(ref_move.current.offsetWidth, 10));
      let global_r_block = parseInt(
        Math.floor(ref_resize2.current.offsetWidth, 10)
      );
      console.log(
        parseInt(e.target.value),
        "input_vvod",
        input_ref2.current.value
      );
      if (parseInt(e.target.value) >= parseInt(input_ref2.current.value)) {
        console.log(parseInt(e.target.value), "input_vvod", global_r_block);
        input_ref.current.value = parseInt(input_ref2.current.value);
      }

      let posics = Math.floor(
        (200 / (diapazon_end - diapazon_start)) *
          (parseInt(e.target.value) - diapazon_start)
      );

      if (global - global_r_block - 3 >= posics) {
        setwidthcustom(posics);
      }
      if (global - global_r_block - 3 < posics) {
        setwidthcustom(global - global_r_block - 3);
      }
    }
  };
  let input_vvod2 = (e) => {
    if (
      parseInt(e.target.value) >= diapazon_start &&
      parseInt(e.target.value) <= diapazon_end
    ) {
      let global = parseInt(Math.floor(ref_move.current.offsetWidth, 10));
      let global_l_block = parseInt(
        Math.floor(ref_resize.current.offsetWidth, 10)
      );

      if (parseInt(e.target.value) <= parseInt(input_ref.current.value)) {
        console.log(parseInt(e.target.value), "input_vvod", global_l_block);
        input_ref2.current.value = parseInt(input_ref.current.value);
      }

      let posics = Math.floor(
        global -
          (200 / (diapazon_end - diapazon_start)) *
            (parseInt(e.target.value) - diapazon_start)
      );

      if (global - global_l_block - 3 >= posics) {
        setwidthcustom2(posics);
      }
      if (global - global_l_block - 3 < posics) {
        setwidthcustom2(global - global_l_block - 3);
      }
    }
  };
  return (
    <>
      <div className="FilterTrumb_input_wrap">
        <input
          placeholder={`от ${diapazon_start}`}
          type="text"
          className="FilterTrumb_input"
          onChange={input_vvod}
          ref={input_ref}
        />
        <input
          placeholder={`до ${diapazon_end}`}
          type="text"
          className="FilterTrumb_input"
          onChange={input_vvod2}
          ref={input_ref2}
        />
        {/* <div className="button_weiv"> показать{widthcustom}</div> */}
      </div>
      <div
        className="conteyner"
        ref={ref_move}
        onMouseLeave={res2}
        onMouseUp={MouseUpHandler}
      >
        <div
          className="inner1"
          ref={ref_resize}
          style={{ minWidth: widthcustom + "px" }}
        >
          <div
            ref={control1}
            className="polzunok"
            onMouseDown={MouseDownHandler}
            style={{ left: widthcustom - 10 + "px" }}
          ></div>
        </div>

        <div
          className="inner2"
          ref={ref_resize2}
          style={{ minWidth: widthcustom2 + "px" }}
        >
          <div
            ref={control2}
            className="polzunok2"
            onMouseDown={MouseDownHandler2}
            style={{ right: widthcustom2 - 10 + "px" }}
          ></div>
        </div>
      </div>
    </>
  );
}
