import { TestBed } from "@angular/core/testing"
import { CoursesService } from "./courses.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { COURSES, findLessonsForCourse } from "../../../../server/db-data"
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { of } from "rxjs"
import { Course } from "../model/course"


describe("CoursesService", () => {
  let coursesService:CoursesService,
  httpTestingController:HttpTestingController,
  httpClient:HttpClient

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });
    coursesService = TestBed.inject(CoursesService)
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should return all courses', () => {
    httpClient = TestBed.inject(HttpClient);

    const homesMock = [
      {
        "title":"Home 1",
        "location":"Amsterndom"
      },
      {
        "title":"Home 2",
        "location":"Chicago"
      },
      {
        "title":"Home 3",
        "location":"North Carolina"
      }
    ];

    const homesMock2 = [
      {
        "title":"Home 1",
        "location":"Amsterndom"
      },
      {
        "title":"Home 2",
        "location":"Chicago"
      },
      {
        "title":"Home 3",
        "location":"North Carolina"
      }
    ];


    spyOn(httpClient,'get').and.returnValue(of(homesMock));
    const spy = jasmine.createSpy('spy')
    coursesService.getHome$().subscribe(spy)

    expect(spy).toHaveBeenCalledWith(homesMock2)
    expect(httpClient.get).toHaveBeenCalledWith('assets/home.json')

  })

  it('should find a course by id', () => {
    coursesService.findCourseById(12)
                  .subscribe(
                    course => {
                      expect(course).toBeTruthy()
                      expect(course.id).toBe(12)
                    }
                  )


    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual("GET")
    req.flush(COURSES[12]);
  });

  it('should save the course data', () => {
    const changes:Partial<Course> = {titles:{description:'Testing MS'}}
    coursesService.saveCourse(12, changes)
    .subscribe(course => {
        expect(course.id).toBe(12)
    });
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toEqual(changes.titles.description)

    req.flush(
      {
        ...COURSES[12],
        ...changes
      }
    )
  })

  it('should give an error if save course fails', () => {

    const changes : Partial<Course> = {titles:{description:'Testing Course'}}

    coursesService.saveCourse(12, changes)
                  .subscribe(
                    () =>
                      fail("the save course operation should have failed."),
                      (error:HttpErrorResponse) => {
                        expect(error.status).toEqual(500);
                        expect(error.error).toContain('500 error')
                      }
                  );

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');
    req.flush('500 error', {status: 500, statusText: 'Internal Server Error'})

  });

  it('should find a list of lessons', () => {
    coursesService.findLessons(12)
                   .subscribe( lessons => {
                    expect(lessons).toBeTruthy();
                    expect(lessons.length).toBe(3);
                  })
                  const req = httpTestingController.expectOne(req => req.url == '/api/lessons');
                  expect(req.request.method).toEqual('GET');

                  expect(req.request.params.get('courseId')).toEqual('12');
                  expect(req.request.params.get('filter')).toEqual('');
                  expect(req.request.params.get('sortOrder')).toEqual('asc');
                  expect(req.request.params.get('pageNumber')).toEqual('0');
                  expect(req.request.params.get('pageSize')).toEqual('3');

                  req.flush({
                    payload: findLessonsForCourse(12).slice(0, 3)
                  })
                })


  afterEach(() => {
    httpTestingController.verify()
  });






})
