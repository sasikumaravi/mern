import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Button, Layout, Menu, Typography, Radio, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Sider, Content, Header } = Layout;
const { Text } = Typography;

export default function TrainFilter() {
  const [quotaValue, setQuotaValue] = useState();
  const [classValue, setClassValue] = useState();
  const [arrivalTimeValue, setArrivalTimeValue] = useState();
  const [departureTimeValue, setDepartureTimeValue] = useState();
  const [sourceCity, setSourceCity] = useState();
  const [destinationCity, setDestinationCity] = useState();
  const [trainData, setTrainData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/train/getalltrain');
        setTrainData(response.data);
      } catch (error) {
        console.error('Error fetching train data:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = trainData.filter(train => {
      const matchesSource = sourceCity ? train.start === sourceCity : true;
      const matchesDestination = destinationCity ? train.destination === destinationCity : true;
      const matchesQuota = quotaValue ? train.quota === quotaValue : true;
      const matchesClass = classValue ? train.seats.some(seat => seat.class === classValue) : true;
      const matchesArrivalTime = arrivalTimeValue ?
        checkTimeRange(train.arrival, arrivalTimeValue) : true;
      const matchesDepartureTime = departureTimeValue ?
        checkTimeRange(train.departure, departureTimeValue) : true;

      return (
        matchesSource &&
        matchesDestination &&
        matchesQuota &&
        matchesClass &&
        matchesArrivalTime &&
        matchesDepartureTime
      );
    });

    setFilteredData(filtered);
    setSearch(true);
  };

  const checkTimeRange = (time, range) => {
    const [start, end] = range.split('-');
    const timeValue = parseInt(time.replace(':', ''), 10);
    const startValue = parseInt(start.replace(':', ''), 10);
    const endValue = parseInt(end.replace(':', ''), 10);

    if (startValue <= endValue) {
      return timeValue >= startValue && timeValue <= endValue;
    } else {
      return timeValue >= startValue || timeValue <= endValue;
    }
  };

  const resetFilters = () => {
    setQuotaValue();
    setClassValue();
    setArrivalTimeValue();
    setDepartureTimeValue();
    setSourceCity();
    setDestinationCity();
    setSearch(false);
    setFilteredData([]);
  };

  return (
    <Layout>
      <Sider
        style={{ backgroundColor: 'white', height: '100vh', position: 'fixed', top: 0 }}
      >
        <Menu>
          <Text strong style={{ margin: 15 }}>Quick Filters</Text>
          <Divider />

          <Text strong style={{ marginLeft: 15 }}>Quota</Text>
          <Radio.Group value={quotaValue} onChange={(e) => setQuotaValue(e.target.value)} style={{ marginLeft: 15 }}>
            <Radio value="general">General</Radio>
            <Radio value="ladies">Ladies</Radio>
          </Radio.Group>
          <Divider />

          <Text strong style={{ marginLeft: 15 }}>Class</Text>
          <Radio.Group value={classValue} onChange={(e) => setClassValue(e.target.value)} style={{ marginLeft: 15 }}>
            <Radio value="CC">AC-Chair</Radio>
            <Radio value="Sleeper">Sleeper</Radio>
            <Radio value="3A">AC 3 Tier</Radio>
            <Radio value="2S">Second Sitting</Radio>
          </Radio.Group>
          <Divider />

          <Text strong style={{ marginLeft: 15 }}>Arrival Time</Text>
          <Radio.Group value={arrivalTimeValue} onChange={(e) => setArrivalTimeValue(e.target.value)} style={{ marginLeft: 15 }}>
            <Radio value="05:00-11:00">05:00 - 11:00</Radio>
            <Radio value="11:00-17:00">11:00 - 17:00</Radio>
            <Radio value="17:00-23:00">17:00 - 23:00</Radio>
            <Radio value="23:00-05:00">23:00 - 05:00</Radio>
          </Radio.Group>
          <Divider />

          <Text strong style={{ marginLeft: 15 }}>Departure Time</Text>
          <Radio.Group value={departureTimeValue} onChange={(e) => setDepartureTimeValue(e.target.value)} style={{ marginLeft: 15 }}>
            <Radio value="05:00-11:00">05:00 - 11:00</Radio>
            <Radio value="11:00-17:00">11:00 - 17:00</Radio>
            <Radio value="17:00-23:00">17:00 - 23:00</Radio>
            <Radio value="23:00-05:00">23:00 - 05:00</Radio>
          </Radio.Group>
          <Divider />

          <Button type="link" onClick={resetFilters} style={{ marginLeft: 15 }}>Reset all</Button>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#f0f2f5', padding: 20 }}>
          <div style={{ display: 'flex', gap: 15 }}>
            <Select
              showSearch
              placeholder="From"
              style={{ width: 200 }}
              value={sourceCity}
              onChange={(value) => setSourceCity(value)}
              options={[
                { value: 'Chennai', label: 'Chennai' },
                { value: 'Coimbatore', label: 'Coimbatore' },
                { value: 'Bangalore', label: 'Bangalore' },
                { value: 'Delhi', label: 'Delhi' },
              ]}
            />

            <Select
              showSearch
              placeholder="To"
              style={{ width: 200 }}
              value={destinationCity}
              onChange={(value) => setDestinationCity(value)}
              options={[
                { value: 'Chennai', label: 'Chennai' },
                { value: 'Coimbatore', label: 'Coimbatore' },
                { value: 'Bangalore', label: 'Bangalore' },
                { value: 'Delhi', label: 'Delhi' },
              ]}
            />

            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Search</Button>
          </div>
        </Header>

        <Content style={{ padding: 20 }}>
          {search && filteredData.length === 0 && <Text>No trains found for the selected filters.</Text>}
          {filteredData.map((train, index) => (
            <div key={index} style={{ marginBottom: 20, padding: 10, border: '1px solid #d9d9d9', borderRadius: 5 }}>
              <Text strong>{train.code} - {train.name}</Text>
              <p>{train.start} ({train.arrival}) - {train.destination} ({train.departure})</p>
            </div>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
}
