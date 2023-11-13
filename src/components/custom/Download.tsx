import React from "react";
import axios from "axios";

const DownloadButton = ({ link }: { link: string }) => {
  const downloadFile = () => {
    axios({
      url: link,
      method: "GET",
      responseType: "blob", // Dữ liệu trả về dạng blob
    })
      .then((response) => {
        // Tạo một URL đối tượng để tạo liên kết tải xuống
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Tạo một thẻ a ẩn và thiết lập thuộc tính href để trỏ đến URL tạo ra
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.txt"); // Thiết lập tên tệp tải xuống

        // Simulate click vào thẻ a để bắt đầu tải xuống
        document.body.appendChild(link);
        link.click();

        // Xóa thẻ a sau khi hoàn thành tải xuống
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Lỗi tải xuống:", error);
      });
  };

  return <button onClick={downloadFile}>Tải xuống</button>;
};

export default DownloadButton;
