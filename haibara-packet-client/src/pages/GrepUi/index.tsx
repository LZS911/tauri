import { Button, Card, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { invoke } from '@tauri-apps/api';
import { ResponseCode } from '../../common/enum';
type FormFields = {
  pattern: string;
  path: string;
  result: string;
};
const GrepUI = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormFields>();
  const submit = (values: FormFields) => {
    const { path, pattern } = values;
    invoke('mini_grep', {
      pattern,
      path,
    }).then((res: any) => {
      if (res.code === ResponseCode.SUCCESS) {
        form.setFieldsValue({
          result: res.data || t('grep.searchResultIsEmpty'),
        });
      } else {
        message.error(res.message);
      }
    });
  };
  return (
    <Card title={t('grep.title')}>
      <Form<FormFields> onFinish={submit} form={form}>
        <Form.Item
          name="pattern"
          label={t('grep.form.pattern')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="path"
          label={t('grep.form.filePath')}
          initialValue={'/Users/liyu/code/tauri/haibara-packet-client/poem.txt'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="result" label={t('grep.form.result')}>
          <Input.TextArea rows={16} />
        </Form.Item>
        <Button htmlType="submit">{t('grep.form.submit')}</Button>
      </Form>
    </Card>
  );
};
export default GrepUI;
