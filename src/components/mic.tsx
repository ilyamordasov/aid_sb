import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ControlButton() {
  const css = ".control-button__bootstrap-root.row,\n.control-button__bootstrap-root .row {\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.control-button__bootstrap-root.row > [class*=\"col\"],\n.control-button__bootstrap-root .row > [class*=\"col\"] {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.control-button__bootstrap-root,\n.control-button__bootstrap-root * {\n  box-sizing: border-box;\n  min-width: 0;\n}\n\n.control-button__bootstrap-root {\n  width: 100%;\n  max-width: 48px;\n}\n\n.control-button__bootstrap-root.control-button__n1, .control-button__bootstrap-root .control-button__n1 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  padding: 0px 12px 0px 12px;\n  background-color: #0000000D;\n  border-radius: 100px;\n  overflow: hidden;\n  justify-content: center;\n  align-items: center;\n  width: 48px;\n  height: 48px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.control-button__bootstrap-root.control-button__c2, .control-button__bootstrap-root .control-button__c2 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.control-button__bootstrap-root.control-button__n3, .control-button__bootstrap-root .control-button__n3 {\n  width: 24px;\n  height: 24px;\n  display: block;\n  object-fit: cover;\n  object-position: center center;\n}";

  return (
    <>
      <style>{css}</style>
      <Row className="control-button__bootstrap-root control-button__n1">
        <Col xs="auto" className="control-button__c2">
          <img className="control-button__n3" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABHJJREFUeAHtnYlx2zAQRX9SgUpAB1YHRgkpgR3EHZgdxKlA7sBJBZQrsFIB5QrkDhSuSY4SjRYALyxI7pvZsc0DBPcAQFwGFEVRFEVRFEVZG18wDzaV2EruKzGVbJtjm+b8RyXH5uehktdK9s3fygBsJUUlp0rOPeSlkm9QOkNKK9FP6beE0sqgeDGoPf48kRTNM5QbfEf/oqaL0DMeoPzHI6ZX/LU8QvkkVPnkuTvUZXnbCmrZNMfo3DPCI2n1RghRfolasRt0I0NYRb5aI1CZH6OszuE3wurqBAN3MVFi3NaKgTsaTlhZ6+gNvDLonMH4GLiNUGAlZIjn+dcYuI1gsQI4BcQqBgz44m/xUUBdDClUhA9YaRRQ5xhX9MSGi8TFRgG14zmvyxAfLgpO6P7NMQu44kfC+wlSMlcXWETiK+JhmeN7yECDNb+Zc9HGEGIa4I45/go59sxxgwXCVXpbyLFFWsXipHAVsGSFxzUMTohEzEH5M+TzcAvRfMWsA5QbqAGEUQMIowYQRg0gjBpAGDWAMGoAYdQAwqgBhFEDCKMGEEYNIExMA3DLhaS7o28RbWlTCgYwkIMbDDoiEjENcGCOS46IGeb4IiPgnTl+Dzm4Z//BAuGmpUjOw+GmpSS9spKb0PTLc59rHk6G+GToP05dQPA9uJkEIQPZXMZLxKdEP0ciOEeKUp8NmVFmkcbk3EdHPnzFj4XwTAqC8+Q84F7O82JOT+eUHxKJO+beAhFxTWz14ZqiTgowmA4D9wKNLCCNcsC9o+Ga6WwD7i8c96e8RMnlPAaR4ZQY8iIG81ykN+SdR2foKhPX/a1SxqiYQ7ZACHmOwbCia3RcraFQj8jhVkwbDRm6QXl7QNhC7TwwzcKRPzFyDIsCXxrXEbGDf6uCHcK3KsgRRoZh0TMZrigoEd7FkCNMYWNKjjAM+EgqkcBaghz8S/4IT+bTk1LcrmbnSCtDApCXcx7SNUQN3Kvoh0qBbh7r2s+iREJYuD2uax9JhnG3LHtD94V3W0+aFonxBLcRDLpDHz4v6F/UFOinKAO3AzwhQXxFEZ0z6AelTcagFyelkkf/W1+cmvRfmmss+o8xGPjfI1kM/F+4kkOQPihvMb/QJ8HCXzyItp0ZfBtIJVnuc/i6GUh2SGNLAMoDNZfn6DROcvhfikI6gxwW43ZXJEdIJJBQ5WkQD4vwDWIzzBxqvYR+4ZJSLKbDIlzxJyxo7yCDbh9WdC2VyxbDsajHgLt0c5SIFJExV6lTZZejbm104QOXLekPuGxVf7y6zuDSK3rX/G3RvaL/2eQz2uy42FiM280wlpRYyaZ9LTnSMMQJM27lDMVAzhCt4lP4FkmCDNP+74BW6BnUPFbFMxiMa4y2VzRJpUvv1ROCRd2yMbi0bgxzLbVc9qinwh+b3w9QRuUZvLfvMDPmuEjv6Dj3jpmhqySFWVoEuM4lydIiYHbdB3M0wEfPc0myNAPMDq0DhNFWkDBz+BK+xZk5Ptf3URRFURRFURRlRfwFFsaQy7n9KPQAAAAASUVORK5CYII="} alt="" />
        </Col>
      </Row>
    </>
  );
}
