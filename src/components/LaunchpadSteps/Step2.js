import React, { useState } from "react";
import StepsBar from "../../components/StepsBar";
import { createRef } from "react";
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
  InputNumber,
} from "antd";
import moment from "moment";
import {
  checkSoftCap,
  checkMinBuy,
  validateField,
  checkDates,
  checkMaxBuy,
} from "../../hooks/useValidation";

export default function Step2({ handleSubmit, handleRefundType, prev, data }) {
  const formRef = createRef();

  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit} ref={formRef}>
        {" "}
        <Form.Item
          name="presaleRate"
          label="Presale Rate"
          initialValue={data?.presaleRate}
          rules={[
            {
              required: true,
              message: "Please enter correct amount!",
            },
          ]}
        >
          <InputNumber placeholder="Ex: Rate" bordered={false} />
        </Form.Item>{" "}
        <Form.Item
          label="Refund Type"
          name="refundType"
          initialValue={data?.refundType}
          rules={[
            {
              required: true,
              message: "Please enter correct data!",
            },
          ]}
        >
          <Select
            placeholder="Select a Type"
            onChange={handleRefundType}
            style={{ backgroundColor: "#000000 !important" }}
          >
            <Select.Option value="refund">Refund</Select.Option>
            <Select.Option value="burn">Burn</Select.Option>
          </Select>
        </Form.Item>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="softCap"
              label="Soft Cap"
              initialValue={data?.softCap}
              onChange={() => validateField(formRef, "softCap")}
              rules={[
                {
                  required: true,
                  validator: () => checkSoftCap(formRef),
                },
              ]}
            >
              <Input placeholder="Ex:0.03" bordered={false} />
            </Form.Item>{" "}
          </div>
          <div className="column pb-0">
            <Form.Item
              name="hardCap"
              label="Hard Cap"
              initialValue={data?.hardCap}
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
              <Input placeholder="Ex: 0.01" bordered={false} />
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
              <Input placeholder="Ex: 0.01" bordered={false} />
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
              <Input placeholder="Ex: 0.01" bordered={false} />
            </Form.Item>
          </div>
        </div>
        <div>
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
            <DatePicker showTime={true} />
          </Form.Item>
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
            <DatePicker showTime={true} />
          </Form.Item>
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
