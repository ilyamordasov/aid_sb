import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface SuggestSiteProps {
  title?: string;
  host?: string;
  actionLabel?: string;
  faviconSrc?: string;
  useTopicIcon?: boolean;
}

export default function SuggestSite({
  title = "Summarize reviews",
  host = "youtube.com",
  actionLabel = "go to site",
  faviconSrc,
  useTopicIcon = false,
}: SuggestSiteProps) {
  const defaultFavicon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDkiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OSA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF82MDE5Nl81ODc3OTEpIj4KPHBhdGggZD0iTTAgMjQuNUMwIDEwLjk2OSAxMC45NjkgMCAyNC41IDBDMzguMDMxIDAgNDkgMTAuOTY5IDQ5IDI0LjVDNDkgMzguMDMxIDM4LjAzMSA0OSAyNC41IDQ5QzEwLjk2OSA0OSAwIDM4LjAzMSAwIDI0LjVaIiBmaWxsPSIjRkFGQUZBIiBmaWxsLW9wYWNpdHk9IjAuNyIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIi8+CjxwYXRoIGQ9Ik0yNC41IDAuNzY1NjI1QzM3LjYwODEgMC43NjU2MjUgNDguMjM0NCAxMS4zOTE5IDQ4LjIzNDQgMjQuNUM0OC4yMzQ0IDM3LjYwODEgMzcuNjA4MSA0OC4yMzQ0IDI0LjUgNDguMjM0NEMxMS4zOTE5IDQ4LjIzNDQgMC43NjU2MjUgMzcuNjA4MSAwLjc2NTYyNSAyNC41QzAuNzY1NjI1IDExLjM5MTkgMTEuMzkxOSAwLjc2NTYyNSAyNC41IDAuNzY1NjI1WiIgc3Ryb2tlPSJ1cmwoI3BhaW50MF9saW5lYXJfNjAxOTZfNTg3NzkxKSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIxLjUzMTI1IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiLz4KPHBhdGggZD0iTTI0Ljk3NTcgMTYuOTEwM0MyMi43MzYzIDE2LjkyNjcgMjAuNjQ3MiAxOS4wMzk4IDE4Ljc5NzggMjIuMTEzOEMxNi45NDEgMjUuMiAxNi4xNzc1IDI4LjExMzkgMTcuMzgxMSAyOS45NzQ4QzE4LjU4NDcgMzEuODM1NyAyMS40NzAzIDMyLjc1MDggMjUuMDAxOCAzMi43NTA4QzI1LjAwMTkgMzIuNzUwOCAyNS4wMDIgMzIuNzUwOCAyNS4wMDIxIDMyLjc1MDhMMjUuMDg0NyAzMi43NTA2QzI4LjU1MTEgMzIuNzM2NSAzMS4zODM3IDMxLjgzNTUgMzIuNTk0MyAzMC4wMTgzTDMyLjYyMjggMjkuOTc0OEMzMy44MTcgMjguMTI4NCAzMy4wNzQ3IDI1LjI0NTQgMzEuMjQ5NSAyMi4xODYxTDMxLjIwNjEgMjIuMTEzOEMyOS4zNDk1IDE5LjAyNzggMjcuMjUxNCAxNi45MTAyIDI1LjAwMjEgMTYuOTEwMkwyNC45NzU3IDE2LjkxMDNaTTI1LjAxMjcgMzAuODEyNEMyNS4wMTM0IDMwLjgxMjQgMjUuMDE0IDMwLjgxMjQgMjUuMDE0NSAzMC44MTI1QzI1LjAxNDQgMzAuODEyNSAyNS4wMTQzIDMwLjgxMjUgMjUuMDE0MyAzMC44MTI1QzI1LjAxMzggMzAuODEyNCAyNS4wMTMxIDMwLjgxMjQgMjUuMDEyNSAzMC44MTI0SDI1LjAxMjdaTTI1LjAxOTcgMzAuODEyNUMyNS4wMTk5IDMwLjgxMjUgMjUuMDIwMiAzMC44MTI1IDI1LjAyMDMgMzAuODEyNUMyNS4wMjAzIDMwLjgxMjUgMjUuMDIwMyAzMC44MTI1IDI1LjAyMDMgMzAuODEyNUMyNS4wMjAxIDMwLjgxMjUgMjUuMDE5OCAzMC44MTI1IDI1LjAxOTYgMzAuODEyNUgyNS4wMTk3Wk0yNS4wMDE5IDMwLjgxMjRDMjMuMzg4MSAzMC44MTI0IDIyLjAxMzEgMzAuNjAxNCAyMC45NjEgMzAuMjMxOEMxOS44OTk0IDI5Ljg1ODkgMTkuMzAyIDI5LjM3NTYgMTkuMDA4NyAyOC45MjIxQzE4Ljc3ODggMjguNTY2NiAxOC42Mjc1IDI3Ljk0NjYgMTguODQxNyAyNi44ODgyQzE5LjA1NSAyNS44MzM4IDE5LjU5NjcgMjQuNTQ1OSAyMC40NTg3IDIzLjExMzFDMjEuMzMzNyAyMS42NTg3IDIyLjIwMzMgMjAuNTQxNyAyMy4wMzQ3IDE5LjgwODZDMjMuODY2NyAxOS4wNzUgMjQuNTE1NCAxOC44NDg2IDI1LjAwMjEgMTguODQ4NUMyNS40ODg3IDE4Ljg0ODUgMjYuMTM3NCAxOS4wNzQ5IDI2Ljk2OTMgMTkuODA4NkMyNy44MDA3IDIwLjU0MTggMjguNjcwMiAyMS42NTg3IDI5LjU0NTIgMjMuMTEzMUMzMC40MDcyIDI0LjU0NTkgMzAuOTQ4OSAyNS44MzM4IDMxLjE2MjIgMjYuODg4MkMzMS4zNzY0IDI3Ljk0NjYgMzEuMjI1MSAyOC41NjY2IDMwLjk5NTIgMjguOTIyMUMzMC43MDE5IDI5LjM3NTYgMzAuMTA0NSAyOS44NTg5IDI5LjA0MjkgMzAuMjMxOEMyNy45OTA4IDMwLjYwMTQgMjYuNjE1OCAzMC44MTI0IDI1LjAwMiAzMC44MTI0SDI1LjAwMTlaTTI1LjAwODUgMzAuODEyNEMyNS4wMDc5IDMwLjgxMjQgMjUuMDA3MyAzMC44MTI0IDI1LjAwNjcgMzAuODEyNEgyNS4wMDY5QzI1LjAwNzYgMzAuODEyNCAyNS4wMDgyIDMwLjgxMjQgMjUuMDA4NyAzMC44MTI0SDI1LjAwODVaIiBmaWxsPSJ1cmwoI3BhaW50MV9yYWRpYWxfNjAxOTZfNTg3NzkxKSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfNjAxOTZfNTg3NzkxIiB4PSItNDUuOTM3NSIgeT0iLTM5LjgxMjUiIHdpZHRoPSIxNDAuODc1IiBoZWlnaHQ9IjE0MC44NzUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNi4xMjUiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMjIuOTY4OCIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzYwMTk2XzU4Nzc5MSIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzYwMTk2XzU4Nzc5MSIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl82MDE5Nl81ODc3OTEiIHgxPSIwIiB5MT0iMCIgeDI9IjUxLjI1NTEiIHkyPSIyLjQ4NDg5IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IndoaXRlIi8+CjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSJ3aGl0ZSIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSJ3aGl0ZSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MV9yYWRpYWxfNjAxOTZfNTg3NzkxIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMTcuMDg0MiAyOC45NDgzIDM0LjI4ODEgLTU2LjE1OTUgMTQuNTY3OCA3LjAwMDMpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjJBMkQiLz4KPHN0b3Agb2Zmc2V0PSIwLjQ2ODU1MyIgc3RvcC1jb2xvcj0iI0ZGMkEyRCIvPgo8c3RvcCBvZmZzZXQ9IjAuNzY3MTYiIHN0b3AtY29sb3I9IiNGRjYyRUEiLz4KPHN0b3Agb2Zmc2V0PSIwLjk2MTI5NCIgc3RvcC1jb2xvcj0iI0M5RkYyNSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=";
  const css = ".suggest__bootstrap-root.row,\n.suggest__bootstrap-root .row {\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.suggest__bootstrap-root.row > [class*=\"col\"],\n.suggest__bootstrap-root .row > [class*=\"col\"] {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.suggest__bootstrap-root,\n.suggest__bootstrap-root * {\n  box-sizing: border-box;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root {\n  width: 100%;\n  max-width: 346px;\n}\n\n.suggest__bootstrap-root.suggest__n1, .suggest__bootstrap-root .suggest__n1 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n  max-width: 100%;\n  justify-content: flex-start;\n  align-items: center;\n  width: 346px;\n  height: 49px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c2, .suggest__bootstrap-root .suggest__c2 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n  flex-shrink: 0;\n}\n\n.suggest__bootstrap-root.suggest__n3, .suggest__bootstrap-root .suggest__n3 {\n  min-width: 0;\n  position: relative;\n  border-radius: 79.625px;\n  overflow: hidden;\n  width: 49px;\n  height: 49px;\n  display: block;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c4, .suggest__bootstrap-root .suggest__c4 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.suggest__bootstrap-root.suggest__n5, .suggest__bootstrap-root .suggest__n5 {\n  width: 49px;\n  height: 49px;\n  display: block;\n  object-fit: cover;\n  object-position: center center;\n}\n\n.suggest__bootstrap-root.suggest__c6, .suggest__bootstrap-root .suggest__c6 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n  flex-shrink: 0;\n}\n\n.suggest__bootstrap-root.suggest__n7, .suggest__bootstrap-root .suggest__n7 {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 0px;\n  flex-wrap: nowrap;\n  overflow-y: auto;\n  overflow-x: hidden;\n  justify-content: center;\n  align-items: flex-start;\n  width: 183px;\n  height: 38px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c8, .suggest__bootstrap-root .suggest__c8 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n  flex-shrink: 0;\n}\n\n.suggest__bootstrap-root.suggest__n9, .suggest__bootstrap-root .suggest__n9 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n  justify-content: flex-start;\n  align-items: center;\n  width: 237px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c10, .suggest__bootstrap-root .suggest__c10 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.suggest__bootstrap-root.suggest__n11, .suggest__bootstrap-root .suggest__n11 {\n  margin: 0;\n  min-width: 0;\n  overflow-wrap: break-word;\n  font-size: 16px;\n  line-height: 22px;\n  color: #000000FF;\n  font-family: \"YS Text Web\";\n  font-weight: 400;\n  letter-spacing: 0px;\n  text-align: left;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  -webkit-box-orient: vertical;\n}\n\n.suggest__bootstrap-root.suggest__c12, .suggest__bootstrap-root .suggest__c12 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n  flex-shrink: 0;\n}\n\n.suggest__bootstrap-root.suggest__n13, .suggest__bootstrap-root .suggest__n13 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 8px;\n  justify-content: flex-start;\n  align-items: flex-start;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c14, .suggest__bootstrap-root .suggest__c14 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.suggest__bootstrap-root.suggest__n15, .suggest__bootstrap-root .suggest__n15 {\n  margin: 0;\n  min-width: 0;\n  overflow-wrap: break-word;\n  font-size: 12px;\n  line-height: 16px;\n  color: #00000073;\n  font-family: \"YS Text Web\";\n  font-weight: 400;\n  letter-spacing: 0px;\n  text-align: left;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  -webkit-box-orient: vertical;\n}\n\n.suggest__bootstrap-root.suggest__c16, .suggest__bootstrap-root .suggest__c16 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n  flex-shrink: 0;\n  flex-shrink: 0;\n}\n\n.suggest__bootstrap-root.suggest__n17, .suggest__bootstrap-root .suggest__n17 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 0px;\n  background-color: #FAFAFAB2;\n  border-radius: 100px;\n  overflow: hidden;\n  justify-content: center;\n  align-items: center;\n  width: 98px;\n  height: 48px;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c18, .suggest__bootstrap-root .suggest__c18 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 1 1 auto;\n  width: 100%;\n}\n\n.suggest__bootstrap-root.suggest__n19, .suggest__bootstrap-root .suggest__n19 {\n  min-width: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 6px;\n  padding: 2px 0px 2px 0px;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: nowrap;\n  --bs-gutter-x: 0;\n  --bs-gutter-y: 0;\n  margin-left: 0;\n  margin-right: 0;\n  min-width: 0;\n}\n\n.suggest__bootstrap-root.suggest__c20, .suggest__bootstrap-root .suggest__c20 {\n  padding-left: 0;\n  padding-right: 0;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.suggest__bootstrap-root.suggest__n21, .suggest__bootstrap-root .suggest__n21 {\n  margin: 0;\n  min-width: 0;\n  overflow-wrap: break-word;\n  font-size: 16px;\n  line-height: 20px;\n  color: #000000FF;\n  font-family: \"YS Text Web\";\n  font-weight: 400;\n  letter-spacing: 0px;\n  text-align: left;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  -webkit-box-orient: vertical;\n}";

  return (
    <>
      <style>{css}</style>
      <Row className="suggest__bootstrap-root suggest__n1">
        <Col xs="auto" className="suggest__c2">
          <Row className="suggest__n3">
            <Col xs="auto" className="suggest__c4">
              {useTopicIcon ? (
                <svg width="19" height="19" viewBox="0 0 19 19" style={{ margin: "15px" }} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M9.97572 1.91025C7.73631 1.92672 5.64723 4.03978 3.79776 7.11384C1.94104 10.2 1.17748 13.1139 2.38109 14.9748C3.58467 16.8357 6.47032 17.7508 10.0018 17.7508C10.0019 17.7508 10.002 17.7508 10.0021 17.7508L10.0847 17.7506C13.5511 17.7365 16.3837 16.8355 17.5943 15.0183L17.6228 14.9748C18.817 13.1284 18.0747 10.2454 16.2495 7.18615L16.2061 7.11384C14.3495 4.02785 12.2514 1.91016 10.0021 1.91016L9.97572 1.91025ZM10.0019 15.8124C8.38814 15.8124 7.01306 15.6014 5.96097 15.2318C4.89936 14.8589 4.30198 14.3756 4.00871 13.9221C3.77877 13.5666 3.62751 12.9466 3.84167 11.8882C4.05502 10.8338 4.59669 9.5459 5.4587 8.11312C6.33374 6.6587 7.20327 5.54175 8.03471 4.80858C8.86667 4.07495 9.51542 3.84855 10.0021 3.84855C10.4887 3.84855 11.1374 4.07493 11.9693 4.80858C12.8007 5.54176 13.6702 6.65873 14.5452 8.11312C15.4072 9.5459 15.9489 10.8338 16.1622 11.8882C16.3764 12.9466 16.2251 13.5666 15.9952 13.9221C15.7019 14.3756 15.1045 14.8589 14.0429 15.2318C12.9908 15.6014 11.6158 15.8124 10.002 15.8124H10.0019Z"
                    fill="url(#paint0_radial_60196_587826)"
                  />
                  <defs>
                    <radialGradient id="paint0_radial_60196_587826" cx="0" cy="0" r="1" gradientTransform="matrix(17.0842 28.9483 34.2881 -56.1595 -0.4322 -7.9997)" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF2A2D" />
                      <stop offset="0.468553" stopColor="#FF2A2D" />
                      <stop offset="0.76716" stopColor="#FF62EA" />
                      <stop offset="0.961294" stopColor="#C9FF25" />
                    </radialGradient>
                  </defs>
                </svg>
              ) : (
                <img
                  className="suggest__n5"
                  src={faviconSrc || defaultFavicon}
                  alt=""
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: "cover",
                    margin: "12.5px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col xs="auto" className="suggest__c6">
          <Row className="suggest__n7">
            <Col xs="auto" className="suggest__c8">
              <Row className="suggest__n9">
                <Col xs="auto" className="suggest__c10">
                  <p className="suggest__n11">{title}</p>
                </Col>
              </Row>
            </Col>
            <Col xs="auto" className="suggest__c12">
              <Row className="suggest__n13">
                <Col xs="auto" className="suggest__c14">
                  <p className="suggest__n15">{`Official site · ${host}`}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs="auto" className="suggest__c16">
          <Row className="suggest__n17">
            <Col xs="auto" className="suggest__c18">
              <Row className="suggest__n19" style={{ justifyContent: "center", width: "100%" }}>
                <Col xs="auto" className="suggest__c20">
                  <p className="suggest__n21" style={{ textAlign: "center" }}>
                    {actionLabel}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
