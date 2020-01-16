import request from '@/utils/request'

export function queryRedisInfo() {
  return request({
    url: '/redis/query',
    method: 'get'
  })
}

export function queryRedisServerInfo(id) {
  return request({
    url: '/redis/'+id+'/server/info',
    method: 'get'
  })
}

export function queryRedisClientInfo(id) {
  return request({
    url: '/redis/'+id+'/client/info',
    method: 'get'
  })
}

export function queryRedisMemoryInfo(id) {
  return request({
    url: '/redis/'+id+'/memory/info',
    method: 'get'
  })
}

export function queryRedisPersistenceInfo(id) {
  return request({
    url: '/redis/'+id+'/persistence/info',
    method: 'get'
  })
}

export function queryRedisStatsInfo(id) {
  return request({
    url: '/redis/'+id+'/stats/info',
    method: 'get'
  })
}

export function queryRedisReplicationInfo(id) {
  return request({
    url: '/redis/'+id+'/replication/info',
    method: 'get'
  })
}

export function queryRedisCPUInfo(id) {
  return request({
    url: '/redis/'+id+'/cpu/info',
    method: 'get'
  })
}

export function queryRedisClusterInfo(id) {
  return request({
    url: '/redis/'+id+'/cluster/info',
    method: 'get'
  })
}

export function queryRedisKeySpaceInfo(id) {
  return request({
    url: '/redis/'+id+'/keySpace/info',
    method: 'get'
  })
}

export function queryRedisMemoryRecord(id,lastMemoryId) {
  let url = '/redis/'+id+'/memory/record';
  if(lastMemoryId !== undefined && lastMemoryId !== null && lastMemoryId > 0 && lastMemoryId !== ''){
    url = url + "?lastMemoryId="+Number.parseInt(lastMemoryId);
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function queryRedisMemoryRecordAround(id,start,end) {
  return request({
    url: '/redis/'+id+'/memory/record/timeAround',
    method: 'get',
    params:{
      start:start,
      end:end
    }
  })
}

