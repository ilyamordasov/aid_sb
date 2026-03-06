import React, { useEffect, useRef, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function InputComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const css = ".input__bootstrap-root.row,\n.input__bootstrap-root .row {\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.row > [class*=\"col\"],\n.input__bootstrap-root .row > [class*=\"col\"] {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.input__bootstrap-root,\n.input__bootstrap-root * {\n  box-sizing: border-box;\n  min-width: 0;\n}\n\n.input__bootstrap-root.input__n1, .input__bootstrap-root .input__n1 {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  justify-content: flex-end;\n  align-items: flex-start;\n  width: 100%;\n  height: auto;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c2, .input__bootstrap-root .input__c2 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  width: 100%;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n3, .input__bootstrap-root .input__n3 {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c4, .input__bootstrap-root .input__c4 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  width: 100%;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n5, .input__bootstrap-root .input__n5 {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 8px;\n  background-color: #0000000D;\n  border-radius: 32px;\n  overflow: hidden;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c6, .input__bootstrap-root .input__c6 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n7, .input__bootstrap-root .input__n7 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n  padding: 8px 8px 0px 8px;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c8, .input__bootstrap-root .input__c8 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 1 1 auto;\n  width: 100%;\n}\n\n.input__bootstrap-root.input__n9, .input__bootstrap-root .input__n9 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 0px;\n  padding: 0px 0px 0px 1px;\n  justify-content: flex-start;\n  align-items: flex-start;\n  width: 100%;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c10, .input__bootstrap-root .input__c10 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n11, .input__bootstrap-root .input__n11 {\n  margin: 0;\n  min-width: 0;\n  overflow-wrap: break-word;\n  font-size: 16px;\n  line-height: 22px;\n  color: #00000073;\n  font-family: system-ui, -apple-system, sans-serif;\n  font-weight: 400;\n  letter-spacing: 0px;\n  text-align: left;\n  width: 100%;\n}\n\n.input__bootstrap-root.input__c12, .input__bootstrap-root .input__c12 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n13, .input__bootstrap-root .input__n13 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 16px;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  max-width: 100%;\n  justify-content: space-between;\n  align-items: flex-end;\n  width: 100%;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c14, .input__bootstrap-root .input__c14 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n}\n\n.input__bootstrap-root.input__n15, .input__bootstrap-root .input__n15 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c16, .input__bootstrap-root .input__c16 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n17, .input__bootstrap-root .input__n17 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  padding: 12px;\n  background-color: #0000000D;\n  border-radius: 100px;\n  overflow: hidden;\n  justify-content: center;\n  align-items: center;\n  width: 48px;\n  height: 48px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c18, .input__bootstrap-root .input__c18 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n19, .input__bootstrap-root .input__n19 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n  overflow: hidden;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c20, .input__bootstrap-root .input__c20 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n21, .input__bootstrap-root .input__n21 {\n  width: 24px;\n  height: 24px;\n  display: block;\n  object-fit: cover;\n  object-position: center center;\n}\n\n.input__bootstrap-root.input__c22, .input__bootstrap-root .input__c22 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n}\n\n.input__bootstrap-root.input__n23, .input__bootstrap-root .input__n23 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  justify-content: flex-end;\n  align-items: center;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c24, .input__bootstrap-root .input__c24 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n25, .input__bootstrap-root .input__n25 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  padding: 12px;\n  background-color: #0000000D;\n  border-radius: 100px;\n  overflow: hidden;\n  justify-content: center;\n  align-items: center;\n  width: 48px;\n  height: 48px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.input__bootstrap-root.input__c26, .input__bootstrap-root .input__c26 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.input__bootstrap-root.input__n27, .input__bootstrap-root .input__n27 {\n  width: 24px;\n  height: 24px;\n  display: block;\n  object-fit: cover;\n  object-position: center center;\n}";

  return (
    <>
      <style>{css}</style>
      <Row className="input__bootstrap-root input__n1" style={{ width: '100%', maxWidth: '100%' }}>
        <Col xs={12} className="input__c2">
          <Row className="input__n3">
            <Col xs={12} className="input__c4">
              <Row className="input__n5">
                <Col xs="auto" className="input__c6">
                  <Row className="input__n7">
                    <Col xs={12} className="input__c8">
                      <Row className="input__n9">
                        <Col xs="auto" className="input__c10">
                          <input
                            ref={inputRef}
                            type="search"
                            className="input__n11"
                            placeholder="ask anything or type url"
                            autoComplete="off"
                            enterKeyHint="search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={{
                              border: 'none',
                              outline: 'none',
                              background: 'transparent',
                              width: '100%',
                              font: 'inherit',
                              color: 'inherit',
                              WebkitAppearance: 'none'
                            }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs="auto" className="input__c12">
                  <Row className="input__n13" style={{ width: '100%', maxWidth: '100%', justifyContent: 'space-between' }}>
                    <Col xs="auto" className="input__c14">
                      <Row className="input__n15">
                        <Col xs="auto" className="input__c16">
                          <Row className="input__n17">
                            <Col xs="auto" className="input__c18">
                              <Row className="input__n19">
                                <Col xs="auto" className="input__c20">
                                  <img className="input__n21" src={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04Ljg4NTYxIDMuNjUzNThDMTAuMTk2OCAxLjM3OTY5IDEzLjEwMjMgMC42MDExNjggMTUuMzc0OCAxLjkxNDgxTDE2LjA5MzIgMi4zMzAwOUMxOC4zNjUxIDMuNjQzNDIgMTkuMTQ0MSA2LjU1MDY4IDE3LjgzMzIgOC44MjQwM0wxMy41Nzk3IDE2LjExMUMxMi42MSAxNy43OTI1IDEwLjU1MTcgMTguNDQ2IDguODcxMTUgMTcuNDc0NUM3LjE5MTE2IDE2LjUwMzQgNi45OTU1NiAxNC41NzA5IDcuOTY0OSAxMi44ODk4TDkuNTMxNDUgMTAuMjYyN0wxMS4xODY2IDcuMzkyMzZMMTIuNDg2IDguMTQxNjZMMTAuODMwOSAxMS4wMTJMOS4yNjQzNCAxMy42MzkxQzguNzA4NTEgMTQuNjAzIDguNjU4NTMgMTUuNjE5IDkuNjIxODQgMTYuMTc1OUMxMC41ODQ2IDE2LjczMjQgMTEuNzI0NyAxNi4zMjUgMTIuMjgwMiAxNS4zNjE3TDE2LjUzMzggOC4wNzQ3M0MxNy40MzEyIDYuNTE4NDkgMTYuODk3OCA0LjUyNzc4IDE1LjM0MjUgMy42Mjg3M0wxNC42MjQxIDMuMjEzNDVDMTMuMDY5NCAyLjMxNDcyIDExLjA4MjEgMi44NDcyIDEwLjE4NTEgNC40MDI4OUw1LjI1ODE1IDEyLjk0NzFDMy44MDg3IDE1LjQ2MDcgNC42NzAyMiAxOC42NzYgNy4xODIyOCAyMC4xMjgxTDcuMjk5MzEgMjAuMTk1N0M5LjgxMDgzIDIxLjY0NzYgMTMuNTU0NSAyMC43ODk4IDE1LjAwMzYgMTguMjc2N0wxOS4xMDAxIDExLjIzNDVMMjAuMzk5NiAxMS45ODM4TDE2LjMwMzEgMTkuMDI2QzE0LjQzOTggMjIuMjU3MyA5Ljc3NzkgMjMuMzYxMSA2LjU0ODYxIDIxLjQ5NDRMNi40MzE1OSAyMS40MjY3QzMuMjAyODUgMTkuNTYwMyAyLjA5NTc1IDE1LjQyODYgMy45NTg3MSAxMi4xOTc4TDguODg1NjEgMy42NTM1OFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo="} alt="" />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs="auto" className="input__c22">
                      <Row className="input__n23">
                        <Col xs="auto" className="input__c24">
                          <Row className="input__n25">
                            <Col xs="auto" className="input__c26">
                              {inputValue ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              ) : (
                                <img className="input__n27" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABGdJREFUeAHtnYtZ2zAQx//tBBnhNoAN0AiM4A3KBniD0gnCBrQTBCYgncBhgrBB6iNOQ9OcJDu2Trbv9333AX7Isu6hhyUBGIZhGIZhGIYxN75gHCxqcbXc1EK1XDfHFs3591o2zc91LS+1PDd/GxfgalnVsq1l10GearmF0RoutArdCv2ccFoFjCCEvcXvBpLX5hnGGb6he6hpI/yMOxj/cI/hC/5U7mF8EFv4bLlL7GP5oRV0YNEc43OPiPek2SshpvAr7EPGol3SH8qoYEoQ4ZifIlbfIayE2dUJBH+YqNBva4Xg94YtZtY64uagVBhDNRUp8NwVZkKBdJZ/CsHvCbPoNfsKgDA8BDn8VZg4bGE5VIS+itlhwvDgWC6WJ3niChOF2/GS1RVIj+QFW7Tvc4wCKfxsocMCcl2QrDL+inQ44fhP6MAfa34J5xwSkVIBV8LxF+jxLBwnJCKlAqS4uoYe0rOvMEGkeKtZ4UkNg2T1UsqP8jvo5+EcqvlKGYKMM5gClDEFKGMKUMYUoIwpQBlTgDKmAGVMAcqYApQxBShjClDGFKBMSgVIy4W0h6PPkWxpUw4KIOhBwvENEpFSAdLXp2voIT17kh7wJhy/gR7Ss39jgvimpWjVA+rTUrogTWgKTS/xzcPRmJ9fQJ4oFjKIFRTf4xrdP2RLGa+QngrdDImRDMkhEV0z4JDH5Fzf6pxQ+HFQnknBSJZcRtwrWV6qVSoEufBjPPEBGUzq9U1sDeGbos4FQBgOgn99QhGRRnXBvb3hm+nsIu5fee7XWqL0GpGG89xPSIxUiDGuSBjnIr1L3rl3Ll1lkmr5aMwWCDHPIVwWunrH166PtYgSYSVUaP+CnLc7xC3ULiPTzGl1z19KXOYFoTROw8QS4a0KlojfqqBEHEUPaQyCzwsqxA8xlIgrsD6lRBwE2ZMqZLDAu4T8kt/jk/kIGTluV7P0pKUxhPIfbOWShbTNJMHfVLxUVmhnsb4ec4WMcPC/eNsx/wL9b1nWdoTzOpCmQ2ZIXfSD2xPaw4X2hO6hZoVuBUXwG8ADMiQUivgcoRucNiuDX5wLlcPU5/pi26T/1Fxzi+7fGAjh98gWQriHq/kJMgTnzZf/UWxr4xAOD1m0Hk4IbSDFkvWXss8UCL/MEnlYE4cqbi6P0Wi8lIhrnRTQw6Hf4YrsiBlwY+HKk5AOh/gNYguMHI6bsT1cLhSH4XCIL/gtJrR3EKFdx4qv5bjscDkO+60p2wxzVEjkkSlXqXNlV2Lf2mjDO45b0q9x3Kp+c3Id4TgqetX87dC+P/CjyWey2XGpceh3mKEvqTDx7cpOKZGHIrZNXrr2nEcNQU8Rsy74cxQY9n8HHISf0WUv6tlA6FcZh1HRLAtde6+eGBz2LRvCsXVDwrXccnnGfir8pvl9DaNXHiFb+xIjY4yL9Daec28YGbZKUpmpeYDvXJaYByhjHqCMeYAy5gHKmAcoM4ae8Dl2wvGxvo9hGIZhGIZhGDPiDxOhhUkKRSC4AAAAAElFTkSuQmCC"} alt="" />
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
