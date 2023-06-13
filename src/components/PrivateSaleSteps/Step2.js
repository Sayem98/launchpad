import React from "react";
import StepsBar from "../../components/StepsBar";
import {
  Card,
  Alert,
  Button,
  Space,
  Radio,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import moment from "moment";
import { useRef } from "react";
import {
  checkSoftCap,
  checkMinBuy,
  checkDates,
  validateField,
  checkMaxBuy,
} from "../../hooks/useValidation";

export default function Step2({ handleSubmit, handleRefundType, prev, data }) {
  const formRef = useRef();

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
        <Form.Item label="Whitelist" name="isWhiteList">
          <Radio.Group value={data.isWhiteList}>
            <Radio value={true}>Enable</Radio>
            <Radio value={false}>Disable</Radio>
          </Radio.Group>
        </Form.Item>{" "}
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="softCap"
              label="Soft Cap"
              onChange={() => validateField(formRef, "softCap")}
              rules={[
                {
                  required: true,
                  validator: () => checkSoftCap(formRef),
                },
              ]}
            >
              <Input placeholder="Ex:0.03" />
            </Form.Item>{" "}
          </div>
          <div className="column pb-0">
            <Form.Item
              name="hardCap"
              label="Hard Cap"
              onChange={() => {
                validateField(formRef, "softCap");
                validateField(formRef, "maxBuy");
              }}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <Input placeholder="Ex: 0.01" />
            </Form.Item>
          </div>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="minBuy"
              label="Min Buy"
              initialValue={data?.minBuy}
              onChange={() => validateField(formRef, "minBuy")}
              rules={[
                {
                  required: true,
                  validator: () => checkMinBuy(formRef),
                },
              ]}
            >
              <Input placeholder="Ex: 0.01" />
            </Form.Item>{" "}
          </div>
          <div className="column pb-0">
            <Form.Item
              name="maxBuy"
              label="Max Buy"
              initialValue={data?.maxBuy}
              onChange={() => {
                validateField(formRef, "minBuy");
                validateField(formRef, "maxBuy");
              }}
              rules={[
                {
                  required: true,
                  validator: () => checkMaxBuy(formRef),
                },
              ]}
            >
              <Input placeholder="Ex: 0.01" />
            </Form.Item>
          </div>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="startDate"
              label="Start Date"
              initialValue={data?.startDate}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} showTime={true} />
            </Form.Item>
          </div>
          <div className="column pb-0">
            <Form.Item
              name="endDate"
              label="End Date"
              initialValue={data?.endDate}
              rules={[
                {
                  validator: () => checkDates(formRef),
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} showTime={true} />
            </Form.Item>
          </div>
        </div>
        <div>
          <Form.Item
            name="initialRelease"
            label="First Fund Release For Project (%)"
            initialValue={data?.initialRelease}
            rules={[
              {
                required: true,
                message: "Please enter correct data!",
              },
            ]}
          >
            <Input placeholder="Ex: 40%" />
          </Form.Item>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="vestingCycle"
              label="Fund Vesting Period Each Cycle (minutes)"
              initialValue={data?.vestingCycle}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <Input placeholder="Ex: 3" />
            </Form.Item>{" "}
          </div>
          <div className="column pb-0">
            <Form.Item
              name="fundRelease"
              label="Fund Release Each Cycle (percent)"
              initialValue={data?.fundRelease}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <Input placeholder="Ex: 20%" />
            </Form.Item>
          </div>
        </div>
        <Form.Item>
          <div className="has-text-centered">
            <Button onClick={prev}>Previous</Button>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
