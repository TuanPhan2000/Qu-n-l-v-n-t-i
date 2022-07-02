package com.team12.btl.service;


import java.util.List;

public interface GeneralService<T>  {

    List<T> findAll();

    T findById(Integer id);

    T create(T t) throws Exception;

    T update(T t) throws  Exception;

    int delete(Integer id) throws Exception;

}
