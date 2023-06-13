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

export default function Step3({ handleSubmit, prev, data }) {
  const { TextArea } = Input;
  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="logoUrl"
              label="Logo Url"
              initialValue={data?.logoUrl}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
          <div className="column pb-0">
            <Form.Item
              name="websiteUrl"
              label="Website Url"
              initialValue={data?.websiteUrl}
              rules={[
                {
                  required: true,
                  message: "Please enter correct data!",
                },
              ]}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="facebookUrl"
              label="Facebook"
              initialValue={data?.facebookUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
          <div className="column pb-0">
            <Form.Item
              name="twitterUrl"
              label="Twitter"
              initialValue={data?.twitterUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="githubUrl"
              label="Github"
              initialValue={data?.githubUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
          <div className="column pb-0">
            <Form.Item
              name="telegramUrl"
              label="Telegram"
              initialValue={data?.telegramUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
        </div>
        <div className="columns mb-0">
          <div className="column pb-0">
            <Form.Item
              name="instagramUrl"
              label="Instagram"
              initialValue={data?.instagramUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
          <div className="column pb-0">
            <Form.Item
              name="discordUrl"
              label="Discord"
              initialValue={data?.discordUrl}
            >
              <Input placeholder="Ex: https://..." />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="redditUrl"
          label="Reddit"
          initialValue={data?.redditUrl}
        >
          <Input placeholder="Ex: https://..." />
        </Form.Item>
        <Form.Item
          name="youtubeUrl"
          label="Youtube Video"
          initialValue={data?.youtubeUrl}
        >
          <Input placeholder="Ex: https://..." />
        </Form.Item>

        <Form.Item
          name="description"
          initialValue={data?.description}
          label="Description"
        >
          <TextArea rows={4} placeholder="Ex: This is the best project..." />
        </Form.Item>

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
